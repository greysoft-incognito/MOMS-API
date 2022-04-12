import cartController from '../controllers/cart.controller';
import cartValidator from '../validators/cart.validator';
import validator from '../middlewares/validator';
import { Router } from 'express';

const router = Router();

router.get(
  '/add-cart/:productId',
  cartValidator.create,
  validator,
  cartController.addToCart
);
router.get('/get', cartController.removeFromCart);
router.delete(
  '/remove-item/:productId',
  cartValidator.removeItem,
  validator,
  cartController.removeFromCart
);

router.delete('/remove-all', cartController.removeAllFromCart);

export default router;
