import { query, param, body } from 'express-validator';

export default {
  create: [
    body('sellerId').exists().isMongoId(),
    body('buyerId').exists().isMongoId(),
    body('cart').exists().isString(),
    body('totalPrice').exists(),
    body('txnId').exists(),
    body('txnReference').exists(),
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
