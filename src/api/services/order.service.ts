import Order from '../models/Order.model';
import { OrderInterface } from '../interfaces/Order.interface';
import helper from '../helpers/helper';
import { ErrorResponse } from '../helpers/response';
import { ProductInterface } from '../interfaces/Product.interface';
import Product from '../models/Product.model';

export default {
  createOrder: async (data: Partial<OrderInterface>) => {
    try {
      const cart: ProductInterface[] = [];
      const order = new Order(data);
      const result = await order.save();
      const x = JSON.parse(data.cart as string) as unknown as Array<
        ProductInterface & { quantity: number }
      >;
      x.forEach((val) => {
        Product.findById(val.product._id)
          .then((doc) => {
            if (!doc) throw Error('item does not exist');
            if (doc?.qtyInStore === 0)
              throw Error(`${val.name} no longer in store`);
            doc.qtyInStore! = doc.qtyInStore - val.quantity;
            return doc.save();
          })
          .then((doc) => {
            cart.push(doc);
          })
          .catch((error) => {
            throw error;
          });
      });
      result.cart = cart;

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updateStatus: async (orderId: string, data: 'shipped' | 'recieved') => {
    try {
      const result = await Order.findByIdAndUpdate(
        orderId,
        { shipStatus: data },
        { new: true }
      );
      if (!result) throw new ErrorResponse('order not found', 400);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getOneOrder: async (orderId: string) => {
    try {
      const result = await Order.findById(orderId);
      if (!result) throw new ErrorResponse('order not found', 400);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getAllOrders: async (id: any) => {
    try {
      const result = await Order.find().or([{ seller: id }, { buyer: id }]);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
