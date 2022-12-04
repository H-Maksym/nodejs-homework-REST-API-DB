const multer = require('multer');
const path = require('path');
// const fs = require('fs/promises');

const tempDir = path.join(__dirname, '../', 'tpm');
// const avatarsDir = path.join(__dirname, 'public', 'avatars');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = upload;
