const express = require('express');
const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate, upload } = require('../../middlewars');
const { schemas } = require('../../models/user');
const router = express.Router();

// sign-up
router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

// verify user
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));

// resend verify user
router.post('/verify', validateBody(schemas.verifyEmailSchema), ctrlWrapper(ctrl.resendEmail));

// sign-in
router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

// get current
router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

// logout
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

// update user subscription
router.patch(
  '/',
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

// update user avatars
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  validateBody(schemas.updateAvatarSchema),
  ctrlWrapper(ctrl.updateAvatar)
);

// get user avatars
router.get('/:avatarsURL', ctrlWrapper(ctrl.getAvatar));

module.exports = router;
