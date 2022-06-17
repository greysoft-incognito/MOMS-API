/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Product from '../models/Product.model';
import { ProductInterface } from '../interfaces/Product.interface';
import helper from '../helpers/helper';
import { ErrorResponse } from '../helpers/response';
import mongoose from 'mongoose';

type Image = {
  key: string;
  url: string;
};
export default {
  seller: {
    createProduct: async (data: Partial<ProductInterface>) => {
      try {
        const product = new Product(data);
        const result = await product.save();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error);
      }
    },
    updateProduct: async (
      productId: string,
      data: Partial<ProductInterface>
    ) => {
      try {
        const product = await Product.findById(productId);
        if (!product) {
          throw new ErrorResponse('product does not exist', 400);
        }
        const arr = Object.keys(data);
        arr.map((val) => {
          product[val] = data[val];
        }); // compare and merge objects if keys are equal
        const result = await product.save();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error);
      }
    },
    updateProductImg: async (productId: string, oldKey: string, img: Image) => {
      try {
        const product = await Product.findById(productId);
        if (!product) throw new ErrorResponse('product dose not exist', 400);
        const arr = product.img;
        const index = arr.findIndex((val) => {
          return val.key === oldKey;
        });

        if (index === -1) throw new ErrorResponse('image not found', 400);
        product.img.splice(index, 1, img);
        const result = await product.save();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error);
      }
    },
    deleteProduct: async (productId: string) => {
      try {
        const result = await Product.findByIdAndDelete(productId);
        if (!result) throw new ErrorResponse('product dose not exist', 400);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error);
      }
    },
    getProducts: async (query: object, userId: string, page: number) => {
      try {
        const result = helper.paginate(
          Product,
          page,
          [...Object.entries(query), { seller: userId }],
          { seller: userId }
        );
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error);
      }
    },
    search: async (query: object, page: number) => {
      try {
        let result;
        if (Object.entries(query).length < 1) {
          result = helper.paginateWithoutQuery(Product, page);
        } else {
          result = helper.paginate(Product, page, query);
        }
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error);
      }
    },
    getOneProduct: async (productId: string) => {
      try {
        const result = await Product.findById(productId);
        if (!result) throw new ErrorResponse('product dose not exist', 400);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
  buyer: {
    getProducts: async (query: object[], page: number) => {
      try {
        const result = helper.paginate(Product, page, query);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error);
      }
    },
    ratings: async (id: string, rate: number) => {
      try {
        const result = await Product.findById(id);
        if (!result) throw new Error('invalid product');

        result.ratings!.total.push(rate);
        result.ratings!.stars =
          result.ratings!.total.reduce((a, b) => a + b, 0) /
          result.ratings!.total.length;
        result.save();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error);
      }
    },
    reviews: async (id: string, comments: string, user: string) => {
      try {
        const result = await Product.findById(id);
        if (!result) throw new Error('invalid product');
        result.reviews?.push({
          user: new mongoose.Types.ObjectId(user),
          comments,
        });
        result.save();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
};
