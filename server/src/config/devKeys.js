require('dotenv').config({ path: '.env' });

console.log(process.env.JWT_SECRET);

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
};
