const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const db = require('./config/db/db');
const minio = require('./config/minio/minio');

const { createUser, updateUser, uploadFile } = require('./controller/userController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.post('/upload', minio.uploadMulter.single('media'), uploadFile);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
