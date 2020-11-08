const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'server/src/.env' });

module.exports = (req, res, next) => {
  //get token from header
  const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(403).send('Unauthorized!');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send(err);
  }
  next();
};
