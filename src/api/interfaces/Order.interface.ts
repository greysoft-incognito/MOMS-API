import mongoose, { Document } from 'mongoose';

export interface OrderInterface extends Document {
  goods: [
    {
      product: mongoose.Types.ObjectId;
      quantity: number;
      price: number;
      desc: {
        color?: string;
        size?: number;
      };
    }
  ];
  totalPrice: number;
  buyer: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  txn_id: number;
  status: 'pending' | 'shipped' | 'recieved';
  discount: number;
  shippingAddress: string;
  tracking: unknown;
}
