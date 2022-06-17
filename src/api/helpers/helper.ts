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
    query: object,
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
  paginateWithoutQuery: async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    model: any, //Model<ProductInterface | OrderInterface | UserInterface>,
    page: number
  ) => {
    try {
      const limit = 10; //TODO
      const startIndex = limit * (page - 1);
      const totalDocs = await model.countDocuments().exec();
      const totalPages = Math.floor(totalDocs / limit) + 1;
      const docs = await model
        .find()
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
  parseData(data: any) {
    for (const [key, value] of Object.entries(data)) {
      !value
        ? delete data[key]
        : key == 'size' || key == 'color'
        ? !data.desc
          ? ((data.desc = { [key]: data[key] }), delete data[key])
          : (Object.assign(data.desc, { [key]: data[key] }), delete data[key])
        : key == 'category'
        ? ((data.categories = data[key]), delete data[key])
        : key == 'subcategory'
        ? ((data.subcategories = data[key]), delete data[key])
        : key == 'productName'
        ? ((data.name = data[key]), delete data[key])
        : false;
    }
    return data;
  },
};
