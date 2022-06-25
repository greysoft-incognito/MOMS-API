import { query, param, body } from 'express-validator';

export default {
  create: [
    body('sellerId').exists().isMongoId(),
    body('cart').exists().isString(),
    body('totalPrice').exists().isInt(),
    body('txnId').exists().isInt(),
    body('txnReference').exists().isInt(),
    body('txnMessage').optional().isString().trim(),
    body('txnStatus').optional(),
    body('discount').optional(),
    body('shippingAddress').optional(),
    body('trackingId').optional(),
    body('trackingUrl').optional(),
  ],
  get: [param('orderId').exists().isMongoId()],
  update: [query('status').isIn(['shipped', 'recieved'])],
};
