module.exports = function (password) {
  //regular expression that requires 1 number, 1 special character, at least one uppercase and one lowercase
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8}$/;

  let validPassword;
  if (regex.test(password)) {
    validPassword = true;
  } else {
    validPassword = false;
  }
  return validPassword;
};
