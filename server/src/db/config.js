const pg = require('pg');
const keys = require('../config/keys');

let pool;
if (process.env.ENV === 'production') {
  pool = new pg.Pool({
    host: keys.PG_HOST,
    user: keys.PG_USER,
    password: keys.PG_PASSWORD,
    database: keys.PG_DATABASE,
    port: keys.PG_PORT,
  });
} else {
  pool = new pg.Pool({
    connectionString: keys.PG_CONNECTION_STRING,
  });
}

module.exports = pool;
