import productValidator from '../validators/product.validator';
import productController from '../controllers/product.controller';
import validator from '../middlewares/validator';
import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import userController from '../controllers/user.controller';

const router = Router();

router.get('/categories/new', productController.getCategories);

router.get('/:productId', productController.getOneProduct);

router.get('/shops', userController.shops);
router.get('/shops/:sellerId', userController.shop);

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
router.get(
  '/',
  productValidator.getPrducts,
  validator,
  productController.search
);

export default router;
