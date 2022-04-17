import { Request, Response, NextFunction } from 'express';
import { ProductInterface } from '../interfaces/Product.interface';
import productService from '../services/product.service';
import constants from '../../config/constants';
import mongoose from 'mongoose';
import { deleteUpload } from '../middlewares/s3';
import { SuccessResponse } from '../helpers/response';

export default {
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files) throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
      let img!: [
        {
          key: string;
          url: string;
        }
      ];
      const files = <Express.MulterS3.File[]>req.files;
      files.map((val: Express.MulterS3.File) => {
        img.push({
          key: val.key,
          url: val.location,
        });
      });
      const id = <string>req.user?._id;
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
      productService.seller.createProduct(product);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const productId = req.params.productId;
      for (const [key, value] of Object.entries(data)) {
        if (!value) {
          delete data[key];
        }
      }

      productService.seller.updateProduct(
        productId,
        data as Partial<ProductInterface>
      );
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
      const query = req.query ? req.query : {};
      delete query.page;
      const id = <string>req.user?._id;
      const result = await productService.seller.getProducts(query, id, page);
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
};
