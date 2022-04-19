import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, SuccessResponse } from '../helpers/response';
import orderService from '../services/order.service';
import {
  OrderInterface,
  safeQuery,
  CartInterface,
} from '../interfaces/Order.interface';
import { Types } from 'mongoose';

export default {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.session.cart)
        throw new ErrorResponse('product dose not exist', 400);
      if (!req.user?._id)
        throw new ErrorResponse('product dose not exist', 400);
      const cart = req.session.cart;
      const data: Partial<OrderInterface> = {
        cart: cart,
        totalPrice: (function (): number {
          const num = cart.reduce((total: number, val: CartInterface) => {
            return total + val.price * val.quantity;
          }, 0);
          if (num) return num;
          else return 0;
        })(),
        buyer: new Types.ObjectId(req.user._id),
        seller: new Types.ObjectId(req.params.sellerId),
        txn_id: req.body.transactionId,
        status: 'pending',
        discount: req.body.discount ? req.body.discount : 0,
        shippingAddress: req.body.shippingAddress,
        tracking: {
          tracking_id: req.body.trackingId,
          endpoint: req.body.trackingUrl,
        },
      };
      const result = await orderService.createOrder(data);
      SuccessResponse.send(res, result);
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      type Status = 'shipped' | 'recieved';
      const orderId = req.params.orderId;
      const status =
        (req.query.status as string) === 'shipped' ||
        (req.query.status as string) === 'recieved'
          ? (req.query.status as Status)
          : '';
      if (status === '') throw new ErrorResponse('invalid status enum', 400);
      const result = await orderService.updateStatus(orderId, status);
      SuccessResponse.send(res, result);
    } catch (error: unknown) {
      next(error);
    }
  },
  getOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.orderId;
      const result = await orderService.getOneOrder(orderId);
      SuccessResponse.send(res, result);
    } catch (error: any) {
      next(error);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page as unknown as number;
      const query = req.query ? safeQuery(req) : {};
      delete query.page;
      const arr = Object.entries(query);
      const result = await orderService.getAllOrders(arr, page);
      SuccessResponse.send(res, result);
    } catch (error: any) {
      next(error);
    }
  },
};
