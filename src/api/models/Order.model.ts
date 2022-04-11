import { model, Model, Schema } from 'mongoose';
import { OrderInterface } from '../interfaces/Order.interface';

const orderSchema: Schema = new Schema<OrderInterface>(
  {
    cart: {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      desc: {
        color: { type: String },
        size: { type: Number },
      },
    },
    totalPrice: { type: Number },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    txn_id: { type: Number, required: true },
    status: {
      enum: ['pending', 'shipped', 'recieved'],
      default: 'pending',
    },
    discount: { type: Number },
    shippingAddress: { type: String },
    tracking: {
      tracking_id: { type: String },
      endpoint: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<OrderInterface> = model('product', orderSchema);
export default Order;
