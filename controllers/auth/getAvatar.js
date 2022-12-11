const { User } = require('../../models/user');
const path = require('path');
// const { HTTPError } = require('../../helpers');

const getAvatar = async (req, res, next) => {
  //   const { avatarsURL } = req.params;
  // const { _id } = req.user;
  console.log('hello');
  const { avatarURL } = await User.findById({ _id: '6387911fb2a9dd8a8104b037' }, 'avatarURL');
  //   res.set('Content-Type', 'image/jpeg');
  res.json({ avatarURL });
  //   res.sendFile(path.join(__dirname, '../../', 'public', avatarURL));
};

module.exports = getAvatar;
