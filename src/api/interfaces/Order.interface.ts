import { Document, Types } from 'mongoose';

export interface CartInterface {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  desc: {
    color?: string;
    size?: number | string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface OrderInterface extends Document {
  cart: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
    desc: {
      color?: string;
      size?: number | string;
    };
  };
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
