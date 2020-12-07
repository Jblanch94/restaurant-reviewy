const db = require('../db/config');
const bcrypt = require('bcrypt');

class AuthService {
  async createNewUser(user) {
    const { first_name, last_name, username, password } = user;
    //check if user already exists
    try {
      const getUsernameQuery = 'SELECT username from Users where username = $1';
      const user = await db.query(getUsernameQuery, [username]);

      //if username exists send back response of user already exists
      if (user.rows.length) {
        throw {
          message: 'Username already exists!',
          statusCode: 400,
          type: 'error',
        };
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

      return newUser;
    } catch (err) {
      return err;
    }
  }

  async authenticateUser(user) {
    const { username, password } = user;
    try {
      //find the user by username
      const findByUsernameQuery =
        'SELECT user_id, username, password FROM Users WHERE username = $1';
      const user = await db.query(findByUsernameQuery, [username]);

      //if user does not exist return user does not exist
      if (!user.rows.length) {
        throw {
          type: 'error',
          message: 'Incorrect username or password!',
          statusCode: 404,
        };
        // return res.status(404).send('Incorrect username or password!');
      }

      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      //if password is not valid then return user does not exist
      if (!validPassword) {
        throw {
          type: 'error',
          message: 'Incorrect username or password!',
          statusCode: 404,
        };
        // return res.status(404).send('Incorrect username or password!');
      }
      return user;
    } catch (err) {
      return err;
    }
  }
}

module.exports = AuthService;
