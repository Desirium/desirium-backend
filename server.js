const express = require('express');
const bodyParser = require('body-parser');
const { createUser, updateUser } = require('./controller/userController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/users', createUser);
app.put('/users/:id', updateUser);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
