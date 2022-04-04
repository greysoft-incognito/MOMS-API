import { Router } from 'express';
import authController from '../controllers/auth.controller';
import authValidator from '../validators/auth.validator';
import validator from '../middlewares/validator';
import passport from 'passport';
import authMiddleware from '../middlewares/auth.middleware';

const router: Router = Router();

// login
router.post(
  '/login',
  authValidator.login,
  validator,
  passport.authenticate('local', {
    failWithError: true,
    successMessage: 'user logged in successfully',
  })
);
// router.post('/login/open', login);
router.get('/logout', authMiddleware.userIsAuth, authController.logout);

// seller login
router.post(
  'seller/login',
  authValidator.login,
  validator,
  authController.login
);
// router.post('/login/open', login);

// buyer signup // open auth // signup with email alone
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
//router.post('/sign-up/open', register);

// seller sign up // open auth
router.post(
  '/sign-up/shop',
  authValidator.sellerRegister,
  validator,
  authController.sellerReg
);
// router.post('/sign-up/shop/transition', register);
// router.post('/sign-up/shop/open', register);

// verify email
router.get('/verify-email', authController.verifyEmail);

// forgot password
router.post(
  '/forgot-password',
  authValidator.email,
  validator,
  authController.forgotPassword
);

// reset password
router.post(
  '/reset-password',
  authValidator.password,
  validator,
  authController.resetPassword
);

export default router;
