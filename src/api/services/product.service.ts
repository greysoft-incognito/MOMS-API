/* eslint-disable @typescript-eslint/no-explicit-any */
import Product from '../models/Product.model';
import { ProductInterface } from '../interfaces/Product.interface';
import helper from '../helpers/helper';

export default {
  seller: {
    createProduct: async (data: ProductInterface) => {
      try {
        const product = new Product(data);
        const result = await product.save();
        return result;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    updateProduct: async (
      productId: string,
      data: Partial<ProductInterface>
    ) => {
      try {
        let result;
        const product = await Product.findById(productId);
        if (product) {
          const arr = Object.keys(data);
          arr.map((val) => {
            product[val] = data[val];
          }); // compare and merge objects if keys are equal
          result = await product.save();
        }
        return result;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    deleteProduct: async (productId: string) => {
      try {
        const result = await Product.findByIdAndDelete(productId);
        return result;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    getProducts: async (query: object, userId: string, page: number) => {
      try {
        const result = helper.paginate(Product, page, [query, { _id: userId }]);
        return result;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    getOneProduct: async (productId: string) => {
      try {
        const result = await Product.findById(productId);
        return result;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
  buyer: {
    getProduct: async (query: object[], page: number) => {
      try {
        const result = helper.paginate(Product, page, query);
        return result;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
};
