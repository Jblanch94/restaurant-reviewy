require('dotenv').config({
  path: '/home/jblanchard/projects/restaurant-reviewy/server/src/.env',
});

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
};
