const express = require('express');
const bcrypt = require('bcrypt');

const db = require('../db/config');
const jwtGenerator = require('../utils/jwtGenerator');
const refreshTokenAuthorization = require('../middlewares/refreshTokenAuthorization');
const authorization = require('../middlewares/authorization');
const usernameValidation = require('../utils/validation/usernameValidation');
const nameValidation = require('../utils/validation/nameValidation');
const passwordValidation = require('../utils/validation/passwordValidation');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { first_name, last_name, username, password } = req.body;

  //validate all required parameters were passed
  if (!first_name || !last_name || !username || !password) {
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

  //check if user already exists
  try {
    const getUsernameQuery = 'SELECT username from Users where username = $1';
    const user = await db.query(getUsernameQuery, [username]);

    //if username exists send back response of user already exists
    if (user.rows.length) {
      return res.status(400).send('Username already exists!');
    }

    //if username does not exist then hash password and insert user into db
    const hashedPassword = await bcrypt.hash(password, 8);

    const insertUserQuery =
      'INSERT INTO Users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING * ';

    //insert user into db with hashed password
    const newUser = await db.query(insertUserQuery, [
      first_name,
      last_name,
      username,
      hashedPassword,
    ]);

    //generate jwt and send to user
    const token = jwtGenerator(
      {
        userId: newUser.rows[0].user_id,
      },
      '15m'
    );
    res.cookie('refresh-token', jwtGenerator(newUser.rows[0].user_id, '20m'), {
      httpOnly: true,
    });
    console.log(newUser.rows[0]);
    res.status(201).json({ token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post('/login', async (req, res) => {
  console.log('hit the login route');
  //destructure the body for username and password
  const { username, password } = req.body;

  //validate that username and password was received
  if (!username || !password) {
    return res.status(400).send('Missing Login Information!');
  }

  try {
    //find the user by username
    const findByUsernameQuery =
      'SELECT user_id, username, password FROM Users WHERE username = $1';
    const user = await db.query(findByUsernameQuery, [username]);

    //if user does not exist return user does not exist
    if (!user.rows.length) {
      return res.status(404).send('Incorrect username or password!');
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    //if password is not valid then return user does not exist
    if (!validPassword) {
      return res.status(404).send('Incorrect username or password!');
    }

    //generate token
    const token = jwtGenerator({ userId: user.rows[0].user_id }, '15m');

    //send refresh token in httponly cookie and send access token
    res.cookie('refreshToken ', jwtGenerator({ token }, '20m'), {
      httpOnly: true,
    });
    res.json({ token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get('/refresh-token', refreshTokenAuthorization, (req, res) => {
  res.cookie('refreshToken', req.refreshToken, { httpOnly: true });
  res.json({ accessToken: req.accessToken });
});

router.get('/is-authenticated', authorization, (req, res) => {
  if (req.user) {
    return res.send({ authenticated: true });
  } else {
    res.send({ authenticated: false });
  }
});

module.exports = router;
