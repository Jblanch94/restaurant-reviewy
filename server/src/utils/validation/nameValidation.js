module.exports = function (first_name, last_name) {
  if (first_name.length === 0 || last_name.length === 0) {
    return false;
  }
  return true;
};
