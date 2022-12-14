const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models/user');
const { HTTPError, resizeImage } = require('../../helpers');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.json({ message: 'Only .png, .jpg and .jpeg format allowed!' });
  }

  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  // INFO Check rename file, when error delete file and return response error.
  try {
    resizeImage(tempUpload, resultUpload);
    //   Jimp.read(tempUpload, (err, image) => {
    //     if (err) HTTPError(400);
    //     image.resize(250, 250).quality(60).write(resultUpload);
    //   });
    // await fs.rename(tempUpload, resultUpload);
  } catch (error) {
    return next(HTTPError(400, 'Something went wrong!'));
  }
  await fs.unlink(tempUpload);

  const avatarURL = path.join('avatars', filename);
  const result = await User.findByIdAndUpdate({ _id }, { avatarURL }, { new: true });
  if (!result) {
    throw HTTPError(404);
  }
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
