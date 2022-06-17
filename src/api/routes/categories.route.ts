import productController from '../controllers/product.controller';
import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.get('/categories', productController.getCategories);

router.get('/', userController.shops);
router.get('/:sellerId', userController.shop);

export default router;
