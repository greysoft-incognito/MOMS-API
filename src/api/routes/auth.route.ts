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
  passport.authenticate(['local'], {
    failWithError: true,
    successMessage: 'user logged in successfully',
  })
);
router.get(
  '/login-facebook',
  passport.authenticate(['facebook'], {
    failWithError: true,
    successMessage: 'user logged in successfully',
  })
);

router.get(
  '/login-google',
  passport.authenticate(['google'], {
    failWithError: true,
    successMessage: 'user logged in successfully',
  })
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
router.post(
  'seller/login',
  authValidator.login,
  validator,
  authController.login
);

// seller sign up
router.post(
  '/sign-up/shop',
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
