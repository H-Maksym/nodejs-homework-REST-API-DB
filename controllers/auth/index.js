const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');
const getAvatar = require('./getAvatar');
const verify = require('./verify');
const resendEmail = require('./resendEmail');

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  getAvatar,
  verify,
  resendEmail,
};
