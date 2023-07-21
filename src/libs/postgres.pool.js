const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5000,
  user: 'chip',
  password: 'admin123',
  database: 'my_store',
});

module.exports = pool;
