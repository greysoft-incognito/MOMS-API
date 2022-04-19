import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import validator from '../middlewares/validator';
import { Router } from 'express';

const router = Router();

router.post(
  '/password',
  userValidator.password,
  validator,
  userController.updatePassword
);
router.post(
  '/avatar',
  userValidator.avatar,
  validator,
  userController.updatAvatar
);
router.post(
  '/name',
  userValidator.name,
  validator,
  userController.updateFullname
);
router.get('/', userController.getMe);

export default router;
