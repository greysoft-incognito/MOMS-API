import { query, param } from 'express-validator';

export default {
  create: [
    param('sellerId').exists().isMongoId(),
    query('transactionId').exists().isInt(),
    query('discount').exists().isInt(),
    query('shippingAddress').optional().isString().trim(),
    query('trackingId').optional(),
    query('trackingUrl').optional(),
  ],
  get: [param('orderId').exists().isMongoId()],
  update: [query('status').isIn(['shipped', 'recieved'])],
};
