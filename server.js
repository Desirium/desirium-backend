const express = require('express');
const bodyParser = require('body-parser');
const {createUser, updateUser} = require('./controller/userController');
const {createWishlist, updateWishlist, findAllWishlist, findWishlistById, deleteWishlist} =
    require('./controller/wishlistController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/users', createUser);
app.put('/users/:id', updateUser);

app.post('/wishlist', createWishlist);
app.put('/wishlist/:id', updateWishlist);
app.get('/wishlist', findAllWishlist);
app.get('/wishlist/:id', findWishlistById);
app.delete('/wishlist/:id', deleteWishlist);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
