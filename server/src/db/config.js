const pg = require('pg');
const keys = require('../config/keys');

const pool = new pg.Pool({
  connectionString: keys.PG_CONNECTION_STRING,
});

module.exports = pool;
