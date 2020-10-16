const pg = require("pg");
require("dotenv").config({
  path: "/home/jblanchard/projects/restaurant-reviewy/server/src/.env",
});

const pool = new pg.Pool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = pool;
