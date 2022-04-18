import cartController from '../controllers/cart.controller';
import cartValidator from '../validators/cart.validator';
import validator from '../middlewares/validator';
import { Router } from 'express';

const router = Router();

router.get(
  '/:productId',
  cartValidator.create,
  validator,
  cartController.addToCart
);
router.get('/', cartController.getCart);
router.delete(
  '/:productId',
  cartValidator.removeItem,
  validator,
  cartController.removeFromCart
);
router.delete('/', cartController.removeAllFromCart);

export default router;
