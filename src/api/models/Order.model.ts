import { model, Model, Schema } from 'mongoose';
import { OrderInterface } from '../interfaces/Order.interface';

const orderSchema: Schema = new Schema<OrderInterface>(
  {
    cart: { type: String },
    totalPrice: { type: Number },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    txn_id: { type: String, required: true },
    txn_ref: { type: String },
    txn_msg: { type: String },
    txn_status: { type: String },
    shipStatus: {
      type: String,
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

const Order: Model<OrderInterface> = model('order', orderSchema);
export default Order;
