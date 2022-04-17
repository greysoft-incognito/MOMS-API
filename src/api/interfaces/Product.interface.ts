import { Document, Types } from 'mongoose';

export interface ProductInterface extends Document {
  name: string;
  price: number;
  discount?: number;
  qtyInStore: number;
  img: [
    {
      key: string;
      url: string;
    }
  ];
  ratings?: number;
  reviews?: [
    {
      user: Types.ObjectId;
      comments: string;
    }
  ];
  categories: string[];
  subCategories: string[];
  desc: {
    color?: string;
    size?: string;
  };
  seller: Types.ObjectId;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
