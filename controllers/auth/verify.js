const { User } = require('../../models/user');
const { HTTPError } = require('../../helpers');

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  // if user not found or the user already verified
  if (!user) {
    throw HTTPError(404);
  }

  // update verification status
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

  res.json({
    message: 'Verification successful',
  });
};

module.exports = verify;
