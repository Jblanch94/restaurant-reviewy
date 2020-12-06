module.exports = function (params) {
  const keys = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    if (!params[keys[i]]) {
      return false;
    }
  }

  return true;
};
