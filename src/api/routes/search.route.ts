import productValidator from '../validators/product.validator';
import productController from '../controllers/product.controller';
import validator from '../middlewares/validator';
import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.put(
  '/:productId/rating',
  authMiddleware.userIsAuth,
  validator,
  productController.rating
);

// body: comment
router.post(
  '/:productId/comment',
  authMiddleware.userIsAuth,
  validator,
  productController.comment
);

router.get('/:productId', productController.getOneProduct);

router.get(
  '/',
  productValidator.getPrducts,
  validator,
  productController.search
);

export default router;
