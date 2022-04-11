// import { Model } from 'mongoose';
// import { OrderInterface } from '../interfaces/Order.interface';
// import { ProductInterface } from '../interfaces/Product.interface';
// import { UserInterface } from '../interfaces/User.Interface';

export default {
  generateToken: () => {
    return [...crypto.getRandomValues(new Uint8Array(40))]
      .map((m) => ('0' + m.toString(16)).slice(-2))
      .join('');
  },
  paginate: async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    model: any, //Model<ProductInterface | OrderInterface | UserInterface>,
    page: number,
    query: object[]
  ) => {
    try {
      const limit = 10; //TODO
      const startIndex = limit * (page - 1);
      const totalDocs = await model.countDocuments().exec();
      const totalPages = Math.floor(totalDocs / limit) + 1;
      const docs = await model
        .find()
        .and([query])
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
