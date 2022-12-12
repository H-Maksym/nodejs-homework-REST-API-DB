const bcrypt = require('bcryptjs');
const { HTTPError } = require('../../helpers');
const { User } = require('../../models/user');
const gravatar = require('gravatar');
const { sendMail } = require('../../helpers');

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HTTPError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { s: '100' });

  const newUser = await User.create({ email, password: hashPassword, subscription, avatarURL });

  const message = {
    to: email,
    subject: 'Verification your email',
    text: 'Verification your email by link',
    html: "<a target='_blanc' href='http://localhost:3000/api/users/login'></a>",
  };
  sendMail(message);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL,
  });
};

module.exports = register;
