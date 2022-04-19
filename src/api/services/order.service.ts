import Order from '../models/Order.model';
import { OrderInterface } from '../interfaces/Order.interface';
import helper from '../helpers/helper';
import { ErrorResponse } from '../helpers/response';

export default {
  createOrder: async (data: Partial<OrderInterface>) => {
    try {
      const order = new Order(data);
      const result = await order.save();
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updateStatus: async (orderId: string, data: 'shipped' | 'recieved') => {
    try {
      const result = await Order.findByIdAndUpdate(
        orderId,
        { status: data },
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
  getAllOrders: async (query: object[], page: number) => {
    try {
      const result = await helper.paginate(Order, page, query);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
