const { Client } = require('pg');

// Create a new client instance
const client = new Client({
    host: 'localhost',
    database: 'desirium',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL database!'))
    .catch(err => console.error('Connection error', err.stack));
