const pool = require('../config/db/db');
const minio = require('../config/minio/minio');

const createUser = async (req, res) => {
    const wallet_address = req.body.walletAddress;

    if (!wallet_address) {
        return res.status(400).json({error: 'wallet_address is required'});
    }

    try {
        let existingUser = await getUserByWalletAddress(wallet_address);

        if (existingUser.rows.length > 0) {
            const user = existingUser.rows[0];
            return res.status(200).json({
                id: user.id,
                wallet_address: user.wallet_address,
                name: user.name,
                surname: user.surname,
                instagram: user.instagram,
                tiktok: user.tiktok,
                twitter: user.twitter,
                linkedin: user.linkedin,
                description: user.description,
                avatar: user.image
            });
        }

        const result = await pool.query(
            'INSERT INTO "user" (wallet_address) VALUES ($1) RETURNING id',
            [wallet_address]
        );

        existingUser = await getUserByWalletAddress(wallet_address);
        if (existingUser.rows.length > 0) {
            const user = existingUser.rows[0];
            res.status(201).json({
                id: user.id,
                wallet_address: user.wallet_address,
                name: user.name,
                surname: user.surname,
                instagram: user.instagram,
                tiktok: user.tiktok,
                twitter: user.twitter,
                linkedin: user.linkedin,
                description: user.description,
                avatar: user.image
            });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserByWalletAddress = async (wallet_address) => {
    return await pool.query(
        'SELECT id, wallet_address, name, surname, tiktok, instagram, linkedin, twitter, description, image FROM "user" WHERE wallet_address = $1',
        [wallet_address]
    );
}

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const file = req.file;

    let imageUrl;
    try {
        const uploadedFile = await minio.uploadFile(file);
        imageUrl = await minio.getFileUrl(uploadedFile.etag);
    } catch (err) {
        console.error("Error while uploading image:", err);
        res.status(500).json({error: 'Internal server error'});
        return
    }

    // Build the SET clause of the SQL query based on provided fields
    const setClauses = [];
    const values = [];
    let index = 1;

    if (name !== undefined) {
        setClauses.push(`name = $${index++}`);
        values.push(name);
    }

    if (imageUrl !== undefined) {
        setClauses.push(`image = $${index++}`);
        values.push(imageUrl);
    }

    // If no fields to update, return an error
    if (setClauses.length === 0) {
        return res.status(400).json({error: 'No fields to update'});
    }

    // Construct the full SQL query
    const queryText = `
        UPDATE "user"
        SET ${setClauses.join(', ')}
        WHERE id = $${index}
    RETURNING id, wallet_address, name, image
  `;

    values.push(id);

    try {
        const result = await pool.query(queryText, values);

        if (result.rowCount === 0) {
            return res.status(404).json({error: 'User not found'});
        }

        const updatedUser = result.rows[0];
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

module.exports = {createUser, updateUser};

