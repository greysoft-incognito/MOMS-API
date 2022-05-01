// import { Model } from 'mongoose';
// import { OrderInterface } from '../interfaces/Order.interface';
// import { ProductInterface } from '../interfaces/Product.interface';
// import { UserInterface } from '../interfaces/User.Interface';
import crypto from 'crypto';

export default {
  generateToken: () => {
    return crypto.randomBytes(48).toString('hex');
  },
  paginate: async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    model: any, //Model<ProductInterface | OrderInterface | UserInterface>,
    page: number,
    query: object[],
    id?: object
  ) => {
    try {
      id = !id ? {} : id;
      const limit = 10; //TODO
      const startIndex = limit * (page - 1);
      const totalDocs = await model.countDocuments(id).exec();
      const totalPages = Math.floor(totalDocs / limit) + 1;
      const docs = await model
        .find()
        .and(query)
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit);

      const result = {
        docs,
        limit,
        totalDocs,
        page,
        totalPages,
      };
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
