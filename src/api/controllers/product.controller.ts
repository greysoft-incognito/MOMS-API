import { Request, Response, NextFunction } from 'express';
import { ProductInterface } from '../interfaces/Product.interface';
import productService from '../services/product.service';
import constants from '../../config/constants';
import mongoose from 'mongoose';
import { deleteUpload } from '../middlewares/s3';
import { SuccessResponse } from '../helpers/response';
import { UserInterface } from '../interfaces/User.Interface';
import { safeQuery } from '../interfaces/Order.interface';
import categoryService from '../services/category.service';
import helper from '../helpers/helper';

export default {
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files) throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
      const files = <Express.MulterS3.File[]>req.files;
      const img: ProductInterface['img'] = [
        {
          key: files[0].key,
          url: files[0].location,
        },
      ];

      files.map((val: Express.MulterS3.File, index: number) => {
        if (index == 0) {
          return;
        }
        img.push({
          key: val.key,
          url: val.location,
        });
      });
      if (!img) throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
      const user = <UserInterface>req.user;
      const id = <string>user._id;
      const product: Partial<ProductInterface> = {
        name: req.body.productName,
        price: parseInt(req.body.price),
        qtyInStore: parseInt(req.body.quantity),
        img: img,
        categories: req.body.category,
        subCategories: req.body.subcategory,
        desc: {
          color: req.body.color ? req.body.color : undefined,
          size: req.body.size ? req.body.size : undefined,
        },
        seller: new mongoose.Types.ObjectId(id),
      };

      const result = await productService.seller.createProduct(
        product,
        user._id
      );
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = req.body;
      const productId = req.params.productId;
      data = helper.parseData(data);
      const result = await productService.seller.updateProduct(
        productId,
        data as Partial<ProductInterface>
      );
      SuccessResponse.send(res, result);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  updateProductImg: async (req: Request, res: Response, next: NextFunction) => {
    const files = <Express.MulterS3.File[]>req.files;
    const productId = req.params.productId;

    const img = { key: files[0].key, url: files[0].location };
    try {
      const result = await productService.seller.updateProductImg(
        productId,
        req.body.oldImgKey,
        img
      );
      await deleteUpload(req.body.oldImgKey);
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      deleteUpload(img.key);
      next(error);
    }
  },
  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.productId;
      const result = await productService.seller.deleteProduct(productId);
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  getProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page as unknown as number;
      // const query = req.query ? req.query : {};
      const query = req.query ? safeQuery(req) : {};
      delete query.page;
      const user = <UserInterface>req.user;
      const id = <string>user._id;
      const result = await productService.seller.getProducts(query, id, page);
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const query = req.query ? req.query : {};
      let query = req.query ? safeQuery(req) : {};
      if (query !== {}) query = helper.parseData(query);
      const page = query.page ? parseInt(query.page) : 1;
      delete query.page;
      const result = await productService.seller.search(query, page);
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  getOneProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.productId;
      const result = await productService.seller.getOneProduct(productId);
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  getCategories: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await categoryService.get();
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  rating: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.productId;
      const rate = parseInt(req.body.rating);

      const result = await productService.buyer.ratings(productId, rate);
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  comment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?._id) throw new Error('invalid user');
      const productId = req.params.productId;
      const comment = req.body.comment;

      const result = await productService.buyer.reviews(
        productId,
        comment,
        req.user._id
      );
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
};
