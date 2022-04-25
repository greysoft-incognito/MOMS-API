import productValidator from '../validators/product.validator';
import productController from '../controllers/product.controller';
import validator from '../middlewares/validator';
import { Router } from 'express';

const router = Router();

router.get(
  '/',
  productValidator.getPrducts,
  validator,
  productController.getProducts
);

export default router;
