const pool = require('../config/db/db');

const createWishlist = async (req, res) => {
    const {user_id, wallet_address, image} = req.body;

    if (!wallet_address || !user_id) {
        return res.status(400).json({error: 'user_id and wallet_address are required'});
    }

    try {
        const result = await pool.query(
            'INSERT INTO wishlist (user_id, wallet_address, image) VALUES ($1, $2, $3) RETURNING id',
            [user_id, wallet_address, image]
        );

        const newWishlistId = result.rows[0].id;
        res.status(201).json({id: newWishlistId, user_id, wallet_address, image});
    } catch (error) {
        console.error('Error creating wishlist item:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

const findAllWishlist = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM wishlist');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error retrieving wishlist items:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

const findWishlistById = async (req, res) => {
    const {id} = req.params;

    try {
        const result = await pool.query('SELECT * FROM wishlist WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({error: 'Wishlist item not found'});
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error retrieving wishlist item:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

const deleteWishlist = async (req, res) => {
    const {id} = req.params;

    try {
        const result = await pool.query('DELETE FROM wishlist WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({error: 'Wishlist item not found'});
        }

        res.status(200).json({message: 'Wishlist item deleted successfully'});
    } catch (error) {
        console.error('Error deleting wishlist item:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

const updateWishlist = async (req, res) => {
    const {id} = req.params;
    const {user_id, wallet_address, image} = req.body;

    // Build the SET clause dynamically based on provided fields
    const setClauses = [];
    const values = [];
    let index = 1;

    if (user_id !== undefined) {
        setClauses.push(`user_id = $${index++}`);
        values.push(user_id);
    }
    if (wallet_address !== undefined) {
        setClauses.push(`wallet_address = $${index++}`);
        values.push(wallet_address);
    }
    if (image !== undefined) {
        setClauses.push(`image = $${index++}`);
        values.push(image);
    }

    if (setClauses.length === 0) {
        return res.status(400).json({error: 'No fields to update'});
    }

    const queryText = `
        UPDATE wishlist
        SET ${setClauses.join(', ')}
        WHERE id = $${index}
        RETURNING id, user_id, wallet_address, image
    `;

    values.push(id);

    try {
        const result = await pool.query(queryText, values);

        if (result.rowCount === 0) {
            return res.status(404).json({error: 'Wishlist item not found'});
        }

        const updatedWishlist = result.rows[0];
        res.status(200).json(updatedWishlist);
    } catch (error) {
        console.error('Error updating wishlist item:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};


module.exports = {
    createWishlist,
    updateWishlist,
    findAllWishlist,
    findWishlistById,
    deleteWishlist
};