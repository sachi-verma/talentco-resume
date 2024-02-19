const bcrypt = require('bcryptjs');

const saltRounds = 10;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

module.exports = {
  hashPassword,
};