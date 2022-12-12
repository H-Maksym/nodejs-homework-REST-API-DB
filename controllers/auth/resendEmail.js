const { HTTPError, sendMail } = require('../../helpers');
const { User } = require('../../models/user');
const { BASE_URL } = process.env;

//* resend email when user not received verification email

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HTTPError(404, 'User not found');
  }

  if (user.verify) {
    throw HTTPError(400, 'Verification has already been passed');
  }

  const message = {
    to: email,
    subject: 'Verification your email',
    text: 'Verify your email',
    html: `<a target='_blank' href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  await sendMail(message);

  res.json({ message: 'Verification email sent' });
};

module.exports = resendEmail;
