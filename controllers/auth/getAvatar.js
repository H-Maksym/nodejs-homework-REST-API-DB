const path = require('path');
const { HTTPError } = require('../../helpers');
const fs = require('fs/promises');

const getAvatar = async (req, res, next) => {
  const { avatarsURL } = req.params;
  const file = path.join(__dirname, '../../public/avatars', avatarsURL);
  try {
    await fs.readFile(file);
    res.sendFile(file);
  } catch (error) {
    next(HTTPError(400, `file ${avatarsURL} not exist`));
  }
};

module.exports = getAvatar;
