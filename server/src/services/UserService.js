const bcrypt = require('bcrypt');
const db = require('../db/config');

class UserService {
  async getCurrentUser(user) {
    try {
      //find user by id
      const query = `SELECT user_id, first_name, last_name, username, isAdmin 
      FROM Users WHERE user_id = $1 `;
      const userProfile = await db.query(query, [user.userId]);
      return userProfile;
    } catch (err) {
      return err;
    }
  }

  async updateUser(user) {
    try {
      //if username was provided
      if (user.username) {
        const usernameQuery =
          'UPDATE Users SET username = $1 WHERE user_id = $2';
        await db.query(usernameQuery, [user.username, user.userId]);
      }

      //if password was provided
      if (user.password) {
        const hashedPassword = await bcrypt.hash(password, 8);
        const passwordQuery =
          'UPDATE Users SET password = $1 WHERE user_id = $2';
        await db.query(passwordQuery, [hashedPassword, user.userId]);
      }
    } catch (err) {
      return err;
    }
  }

  async fetchAllUsers() {
    try {
      const query =
        'SELECT user_id, first_name, last_name, username, review_count, isadmin FROM Users';
      const response = await db.query(query);
      return response;
    } catch (err) {
      return err;
    }
  }

  async fetchUserById(user) {
    try {
      const query =
        'SELECT user_id, first_name, last_name, username FROM users WHERE user_id = $1';
      const response = await db.query(query, [user.userId]);
      return response;
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserService;
