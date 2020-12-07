const User = require('../models/User');
const AuthService = require('../services/AuthService');
const jwtGenerator = require('../utils/jwtGenerator');
const usernameValidation = require('../utils/validation/usernameValidation');
const nameValidation = require('../utils/validation/nameValidation');
const passwordValidation = require('../utils/validation/passwordValidation');
const checkParams = require('../utils/validation/checkParams');

const registerUser = async (req, res) => {
  const { first_name, last_name, username, password } = req.body;

  //validate all required parameters were passed
  const validParams = checkParams({
    first_name,
    last_name,
    username,
    password,
  });
  if (!validParams) {
    return res.status(400).send('Missing registration information!');
  }

  //validate username
  const validUsername = usernameValidation(username);
  if (!validUsername) {
    return res.status(400).send('Username must contain at least 8 characters!');
  }

  //validate first_name and last_name
  const validName = nameValidation(first_name, last_name);
  if (!validName) {
    return res
      .status(400)
      .send(
        'First name and last name must contain at least one character each!'
      );
  }

  //validate password
  const validPassword = passwordValidation(password);
  if (!validPassword) {
    return res
      .status(400)
      .send(
        'Password must contain at least one special character, number, lowercase character and uppercase character!'
      );
  }

  try {
    const newUser = new User(req.body);
    const authService = new AuthService();
    const user = await authService.createNewUser(newUser);

    if (user.type === 'error') {
      throw { user };
    }

    const data = user.rows[0];

    //generate jwt and send to user
    const token = jwtGenerator(
      {
        userId: data.user_id,
      },
      '15m'
    );
    res.cookie('refresh-token', jwtGenerator({ userId: data.user_id }, '20m'), {
      httpOnly: true,
    });
    res.status(201).json({ token });
  } catch (err) {
    const { message, statusCode } = err.user;
    return res.status(statusCode || 500).send(message);
  }
};

const loginUser = async (req, res) => {
  //destructure the body for username and password
  const { username, password } = req.body;

  //validate that username and password was received
  const validParams = checkParams({ username, password });
  if (!validParams) {
    return res.status(400).send('Missing Login Information!');
  }

  try {
    const authService = new AuthService();
    const user = await authService.authenticateUser(req.body);

    if (user.type === 'error') {
      throw user;
    }

    //generate token
    const token = jwtGenerator({ userId: user.rows[0].user_id }, '15m');

    //send refresh token in httponly cookie and send access token
    res.cookie('refreshToken ', jwtGenerator({ token }, '20m'), {
      httpOnly: true,
    });
    res.json({ token });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).send(err.message);
  }
};

const refreshToken = (req, res) => {
  res.cookie('refreshToken', req.refreshToken, { httpOnly: true });
  res.json({ accessToken: req.accessToken });
};

const isAuthenticated = (req, res) => {
  if (req.user) {
    return res.send({ authenticated: true });
  } else {
    res.send({ authenticated: false });
  }
};

module.exports = { registerUser, loginUser, refreshToken, isAuthenticated };
