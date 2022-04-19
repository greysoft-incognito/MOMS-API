import { query, param } from 'express-validator';

export default {
  create: [
    param('productId').exists().isMongoId(),
    query('quantity').exists().isInt(),
    query('price').exists().isInt(),
    query('color').optional().isString().trim(),
    query('size').optional(),
  ],
  removeItem: [param('productId').exists().isMongoId()],
};
