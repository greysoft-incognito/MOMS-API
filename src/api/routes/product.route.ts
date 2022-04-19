import productValidator from '../validators/product.validator';
import productController from '../controllers/product.controller';
import validator from '../middlewares/validator';
import { img } from '../middlewares/s3';
import { Router } from 'express';

const router = Router();

router.post(
  '/',
  img,
  productValidator.create,
  validator,
  productController.createProduct
);
router.post(
  '/:productId',
  productValidator.update,
  validator,
  productController.updateProduct
);
router.post(
  '/img/:productId',
  img,
  productValidator.updateImg,
  validator,
  productController.updateProductImg
);
router.delete(
  '/:productId',
  productValidator.productId,
  validator,
  productController.deleteProduct
);
router.get(
  '/',
  productValidator.getPrducts,
  validator,
  productController.getProducts
);
router.get(
  '/:productId',
  productValidator.productId,
  validator,
  productController.getOneProduct
);

export default router;
