const sgMail = require('@sendgrid/mail');
const HTTPError = require('./HttpError');

const { SENDGRID_API_KEY, EMAIL_ADMIN } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async data => {
  const message = {
    ...data,
    from: {
      name: 'Verify email',
      email: EMAIL_ADMIN,
    },
  };
  try {
    await sgMail.send(message);
  } catch (error) {
    HTTPError(400);
  }
  return true;
};

module.exports = sendMail;
