const express = require('express');
const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate, upload } = require('../../middlewars');
const { schemas } = require('../../models/user');
const router = express.Router();

// sign-up
router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

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
  validateBody(schemas.updateSubscription),
  ctrlWrapper(ctrl.updateSubscription)
);

// update user avatars
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  validateBody(schemas.updateAvatar),
  ctrlWrapper(ctrl.updateAvatar)
);

// get user avatars
// router.get('/:avatarsURL');
// router.get('/avatars/:avatarsURL', ctrlWrapper(ctrl.getAvatar));

module.exports = router;
