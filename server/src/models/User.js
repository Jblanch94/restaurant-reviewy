class User {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.username = user.username;
    this.password = user.password;
    this.userId = user.userId;
  }
}

module.exports = User;
