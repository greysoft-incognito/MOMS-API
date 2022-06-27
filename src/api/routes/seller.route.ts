import userValidator from '../validators/user.validator';
import userController from '../controllers/user.controller';
import validator from '../middlewares/validator';
import orderValidator from '../validators/order.validator';
import orderController from '../controllers/order.controller';
import { Router } from 'express';
import { img, avi } from '../middlewares/s3';

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

router.get('/me', userController.getMe);

router.put(
  '/shop-banner',
  avi,
  userValidator.avatar,
  validator,
  userController.updateShopAvatar
);

router.post(
  '/verify',
  img,
  userValidator.verify,
  validator,
  userController.verify
);

router.put(
  '/edit-shop',
  userValidator.editShop,
  validator,
  userController.editShop
);

// router.post(
//   '/update',
//   orderValidator.update,
//   validator,
//   orderController.update
// );

router.get('order/', orderController.getAll);

router.get(
  'order/:orderId',
  orderValidator.get,
  validator,
  orderController.getOne
);
export default router;
