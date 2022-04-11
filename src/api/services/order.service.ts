/* eslint-disable @typescript-eslint/no-explicit-any */
import Order from '../models/Order.model';
import { OrderInterface } from '../interfaces/Order.interface';
import helper from '../helpers/helper';

export default {
  createOrder: async (data: OrderInterface) => {
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
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getOneOrder: async (orderId: string) => {
    try {
      const result = await Order.findById(orderId);
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
