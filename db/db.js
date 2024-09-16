const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    database: 'desirium',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
});

module.exports = pool;
