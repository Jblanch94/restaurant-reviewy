const db = require('../db/config');

module.exports = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const query =
      'SELECT user_id, first_name, last_name, username, isAdmin FROM Users WHERE user_id = $1';
    const user = await db.query(query, [userId]);
    const userData = user.rows[0];

    //check if admin
    if (!userData.isadmin) {
      return res.send('Access denied!');
    }

    req.admin = userData;
  } catch (err) {
    return res.status(500).send(err.message);
  }
  next();
};
