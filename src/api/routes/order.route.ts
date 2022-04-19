import orderValidator from '../validators/order.validator';
import orderController from '../controllers/order.controller';
import validator from '../middlewares/validator';
import { Router } from 'express';

const router = Router();

router.post('/', orderValidator.create, validator, orderController.create);

router.post(
  '/update',
  orderValidator.update,
  validator,
  orderController.update
);

router.get('/', orderController.getAll);

router.get('/orderId', orderValidator.get, validator, orderController.getOne);

export default router;
