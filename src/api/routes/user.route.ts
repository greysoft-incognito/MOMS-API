import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import validator from '../middlewares/validator';
import orderValidator from '../validators/order.validator';
import orderController from '../controllers/order.controller';
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

router.post('order/', orderValidator.create, validator, orderController.create);

router.get('order/', orderController.getAll);

router.get(
  'order/:orderId',
  orderValidator.get,
  validator,
  orderController.getOne
);

router.get('/', userController.getMe);

export default router;
