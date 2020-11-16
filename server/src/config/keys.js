let keys;

if (process.env.ENV === 'production') {
  keys = require('./prodKeys');
} else {
  keys = require('./devKeys');
}

module.exports = keys;
