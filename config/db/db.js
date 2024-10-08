const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    database: 'desirium',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

module.exports = pool;
