import { model, Model, Schema } from 'mongoose';
import { ProductInterface } from '../interfaces/Product.interface';

const productSchema: Schema = new Schema<ProductInterface>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true, default: 0 },
    qtyInStore: { type: Number, required: true, default: 0 },
    img: [
      {
        key: { type: String },
        url: { type: String },
      },
    ],
    ratings: {
      stars: { type: Number, default: 0 },
      total: [{ type: Number }],
    },
    reviews: [
      new Schema(
        {
          user: { type: Schema.Types.ObjectId, ref: 'User' },
          comments: { type: String },
        },
        { timestamps: true }
      ),
    ],
    categories: [{ type: String }],
    subCategories: [{ type: String }],
    desc: {
      color: { type: String },
      size: { type: String },
    },
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Product: Model<ProductInterface> = model('product', productSchema);
export default Product;
