import mongoose, { Document } from 'mongoose';

export interface ProductInterface extends Document {
  name: string;
  price: number;
  discount?: number;
  QtyInStore: number;
  img: string[];
  ratings?: number;
  reviews?: [
    {
      user: mongoose.Types.ObjectId;
      comments: string;
    }
  ];
  categories: string[];
  subCategories: string[];
  desc: {
    colour?: string;
    size?: string;
  };
  seller: mongoose.Types.ObjectId;
}
