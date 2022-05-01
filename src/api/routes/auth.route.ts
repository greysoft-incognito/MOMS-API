import { Router } from 'express';
import authController from '../controllers/auth.controller';
import authValidator from '../validators/auth.validator';
import validator from '../middlewares/validator';
import passport from 'passport';
import authMiddleware from '../middlewares/auth.middleware';

const router: Router = Router();
/**
 *  buyers
 */
// login

router.post(
  '/login',
  authValidator.login,
  validator,
  passport.authenticate(
    ['local'] /*, {
    failWithError: true,
    successMessage: 'user logged in successfully',
  }*/
  ),
  authController.login2
);

router.get('/login3', authValidator.h, authController.login2);

router.get(
  '/facebook',
  authController.passportSaveHost,
  passport.authenticate(['facebook'], { scope: ['email', 'profile'] })
);

router.get(
  '/auth/facebook/redirect',
  passport.authenticate(['facebook'], {
    failureMessage: 'login failed',
  }),
  authController.passportLogin
);

router.get(
  '/google',
  authController.passportSaveHost,
  passport.authenticate(['google'], { scope: ['email', 'profile'] })
);

router.get(
  '/google/redirect',
  passport.authenticate(['google'], {
    failureMessage: 'login failed',
  }),
  authController.passportLogin
);

//sign-up
router.post(
  '/sign-up/fast',
  authValidator.email,
  validator,
  authController.buyerReg
);

router.post(
  '/sign-up/full',
  authValidator.buyerRegister,
  validator,
  authController.buyerReg
);
router.get('/logout', authMiddleware.userIsAuth, authController.logout);
/**
 * sellers
 */
// seller login
router.post('/login2', authValidator.login, validator, authController.login);

// seller sign up
router.post(
  '/sign-up',
  authValidator.sellerRegister,
  validator,
  authController.sellerReg
);
// router.post('/sign-up/shop/transition', register);

// verify email
router.get('/verify-email/:token', authController.verifyEmail);

// forgot password
router.post(
  '/forgot-password',
  authValidator.email,
  validator,
  authController.forgotPassword
);

// reset password
router.post(
  '/reset-password/:token',
  authValidator.password,
  validator,
  authController.resetPassword
);

export default router;
