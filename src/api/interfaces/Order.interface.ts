import { Document, Types } from 'mongoose';

export interface CartInterface {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  desc: {
    color?: string;
    size?: number;
  };
}

export interface OrderInterface extends Document {
  cart: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
    desc: {
      color?: string;
      size?: number;
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
