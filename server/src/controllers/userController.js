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

const fetchAllUsers = async (req, res) => {
  try {
    const userService = new UserService();
    const data = await userService.fetchAllUsers();
    res.send(data.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const fetchUserById = async (req, res) => {
  try {
    const user = new User({ userId: req.params.id });
    const userService = new UserService();
    const response = await userService.fetchUserById(user);
    res.json(response.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  fetchCurrentUser,
  updateUser,
  fetchAllUsers,
  fetchUserById,
};
