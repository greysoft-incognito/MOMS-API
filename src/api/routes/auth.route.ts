import { Router } from 'express';
import authController from '../controllers/auth.controller';
import authValidator from '../validators/auth.validator';
import validator from '../middlewares/validator'
const router: Router = Router();

// login
router.post('/login', authValidator.login, validator, authController.login);
// router.post('/login/open', login);

// buyer signup // open auth // signup with email alone
router.post('/sign-up/fast',authValidator.register register);
router.post('/sign-up/full', register);
router.post('/sign-up/open', register);


// seller sign up // open auth
router.post('/sign-up/shop', register);
router.post('/sign-up/shop/open', register);
router.post('/sign-up/shop/transition', register);

// verify email
router.get('/verify-email', register);

// forgot password
router.post('/forgot-password', register);

// reset password
router.post('/reset-password', register);


export default router;
