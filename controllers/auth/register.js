const bcrypt = require('bcryptjs');
const { HTTPError, sendMail } = require('../../helpers');
const { User } = require('../../models/user');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HTTPError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();

  const avatarURL = gravatar.url(email, { s: '100' });

  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const message = {
    to: email,
    subject: 'Verification your email',
    text: 'Verify your email',
    html: `<a target='_blank' href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify your email</a>`,
  };

  await sendMail(message);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL,
  });
};

module.exports = register;
