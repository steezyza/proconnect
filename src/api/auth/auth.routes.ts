import express from 'express';
import * as authController from './auth.controller';
// import { validate } from '../../middlewares/validate';
// import * as authValidation from './auth.validation';

const router = express.Router();

router.post('/signup', /* validate(authValidation.signup), */ authController.signup);
router.post('/login', /* validate(authValidation.login), */ authController.login);
router.post('/logout', authController.logout);

// OAuth routes would go here
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/google/callback', passport.authenticate('google'), authController.oauthCallback);

export default router;
