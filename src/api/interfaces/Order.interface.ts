import { Document, Types } from 'mongoose';
import { Request } from 'express';

export type CartInterface = {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  desc: {
    color?: string;
    size?: number | string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export interface OrderInterface extends Document {
  cart: CartInterface[];
  totalPrice: number;
  buyer: Types.ObjectId;
  seller: Types.ObjectId;
  txn_id: number;
  status: 'pending' | 'shipped' | 'recieved';
  discount: number;
  shippingAddress: string;
  tracking: {
    tracking_id: string;
    endpoint: string;
  };
}

export function safeQuery<T extends string>(q: Request): { [k in T]: string } {
  return q.query as any;
}
