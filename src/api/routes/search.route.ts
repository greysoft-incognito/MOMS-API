import productValidator from '../validators/product.validator';
import productController from '../controllers/product.controller';
import validator from '../middlewares/validator';
import { Router } from 'express';

const router = Router();

router.get(
  '/',
  productValidator.getPrducts,
  validator,
  productController.search
);

router.get('/:productId', productController.getOneProduct);

router.get('/categories', productController.getCategories);

export default router;
