const pool = require('../config/db/db');
const minio = require('../config/minio/minio');

const createUser = async (req, res) => {
    const {wallet_address} = req.body;

    if (!wallet_address) {
        return res.status(400).json({error: 'wallet_address is required'});
    }

    try {
        const result = await pool.query(
            'INSERT INTO "user" (wallet_address) VALUES ($1) RETURNING id',
            [wallet_address]
        );

        const newUserId = result.rows[0].id;
        res.status(201).json({id: newUserId, wallet_address});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({error: 'Internal server error'});
    }

};

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const file = req.file;

    if (!file || !name) {
        return res.status(400);
    }

    const uploadedFile = await minio.uploadFile(file);
    const imageUrl = await minio.getFileUrl(uploadedFile.etag);

    // Build the SET clause of the SQL query based on provided fields
    const setClauses = [];
    const values = [];
    let index = 1;

    if (name !== undefined) {
        setClauses.push(`name = $${index++}`);
        values.push(name);
    }
    if (image !== undefined) {
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

const uploadFile = async (req, res) => {
    const file = req.file;

    const uploadedFile = await minio.uploadFile(file);
    const url = await minio.getFileUrl(uploadedFile.etag);
    console.log(url)
    res.json({url});
}

module.exports = {createUser, updateUser, uploadFile};

