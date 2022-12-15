const Jimp = require('jimp');
const HTTPError = require('./HttpError');

const resizeImage = (tempUpload, resultUpload) => {
  Jimp.read(tempUpload, (err, image) => {
    if (err) HTTPError(400);
    image.resize(250, 250).quality(60).write(resultUpload);
  });
};

module.exports = resizeImage;
