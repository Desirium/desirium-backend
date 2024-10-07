const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const minio = require('./config/minio/minio');

const {createUser, updateUser} = require('./controller/userController');
const {createWishlist, updateWishlist, findAllWishlistByUserId, findAllWishlist, findWishlistById, deleteWishlist} =
    require('./controller/wishlistController');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/users', createUser);
app.put('/users/:id', minio.uploadMulter.single('media'), updateUser);

app.post('/wishlist', createWishlist);
app.put('/wishlist/:id', updateWishlist);
app.get('/wishlist/user/:userId', findAllWishlistByUserId);
app.get('/wishlist', findAllWishlist);
app.get('/wishlist/:id', findWishlistById);
app.delete('/wishlist/:id', deleteWishlist);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
