const UserService = require('../services/UserService');
const User = require('../models/User');

const fetchCurrentUser = async (req, res) => {
  try {
    const userService = new UserService();
    const user = new User(req.user);
    const response = await userService.getCurrentUser(user);
    //send back user profile
    const userProfile = response.rows[0];
    res.json(userProfile);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.user;
  const { username, password } = req.body;

  if (!username && !password) {
    return res.status(400).send('No updates were specified!');
  }

  try {
    const user = new User({ ...req.body, userId });
    const userService = new UserService();
    await userService.updateUser(user);

    res.send('Success!');
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.user;

  try {
    const fetchUserQuery = 'SELECT username FROM Users WHERE user_id = $1';
    const user = await db.query(fetchUserQuery, [userId]);

    if (user.rowCount === 1) {
      const query = 'DELETE FROM Users WHERE user_id = $1';
      await db.query(query, [userId]);
      return res.send('Account Deleted');
    }
    res.status(404).send('Account does not exist!');
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const query =
      'SELECT user_id, first_name, last_name, username, review_count, isadmin FROM Users';
    const response = await db.query(query);
    const data = response.rows;
    res.send(data);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const fetchUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const query =
      'SELECT user_id, first_name, last_name, username, review_count FROM users WHERE user_id = $1';
    const user = await db.query(query, [id]);
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  fetchCurrentUser,
  updateUser,
  deleteUser,
  fetchAllUsers,
  fetchUserById,
};
