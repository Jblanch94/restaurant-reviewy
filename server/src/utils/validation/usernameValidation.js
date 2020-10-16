module.exports = function (username) {
  //check if length of username is at least 8 characters
  if (username.length < 8) {
    return false;
  }
  return true;
};
