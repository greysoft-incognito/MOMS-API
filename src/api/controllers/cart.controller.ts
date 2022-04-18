import { CartInterface } from '../interfaces/Order.interface';
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, SuccessResponse } from '../helpers/response';
import { Types } from 'mongoose';

export default {
  addToCart: (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CartInterface = {} as CartInterface;
      data.product = new Types.ObjectId(req.params.productId);
      data.quantity = req.query.quantity as unknown as number;
      data.price = req.query.price as unknown as number;

      req.query.color ? (data.desc.color = <string>req.query.color) : false;
      req.query.size
        ? (data.desc.size = req.query.size as unknown as number | string)
        : false;

      let cart = <CartInterface[]>req.session.cart;
      // check if item exists on cart
      const idx = cart.findIndex((val) => {
        val.product.toString() === req.params.productId;
      });

      // if true.. update it
      if (idx) {
        data.desc.color ? (cart[idx].desc.color = data.desc.color) : false;
        data.quantity ? (cart[idx].quantity = data.quantity) : false;
        data.desc.size ? (cart[idx].desc.size = data.desc.size) : false;

        req.session.cart = cart;
        cart = req.session.cart;

        SuccessResponse.send(res, { result: cart });
      } else {
        // else add it to cart
        const arr: CartInterface[] = [];
        arr.push(data);
        req.session.cart = arr;

        const result = req.session.save();
        SuccessResponse.send(res, result);
      }
    } catch (error) {
      next(error);
    }
  },

  getCart: (req: Request, res: Response, next: NextFunction) => {
    try {
      let cart;
      req.session.cart ? (cart = req.session.cart) : (cart = {});
      SuccessResponse.send(res, { result: cart });
    } catch (error) {
      next(error);
    }
  },
  removeFromCart: (req: Request, res: Response, next: NextFunction) => {
    try {
      let cart = req.session.cart;
      if (cart) {
        cart = cart.concat().filter((val) => {
          val.product.toString() != req.params.productId;
        });
        req.session.cart = cart;
        cart = req.session.cart;
        SuccessResponse.send(res, { result: cart });
      }
      throw new ErrorResponse('cart doesnot exist', 400);
    } catch (error) {
      next(error);
    }
  },
  removeAllFromCart: (req: Request, res: Response, next: NextFunction) => {
    try {
      req.session.cart = undefined;
      SuccessResponse.send(res, { result: null });
    } catch (error) {
      next(error);
    }
  },
};
