import { Request, Response, NextFunction } from 'express';
import { SuccessResponse } from '../helpers/response';
import userService from '../services/user.service';
import constants from '../../config/constants';
import { UserInterface } from '../interfaces/User.Interface';
import helper from '../helpers/helper';
export default {
  updatePassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = <UserInterface>req.user;
      const id = <string>user._id;
      const oldPassword = req.body.oldPassword;
      const password = req.body.password;
      const result = await userService.updatePassword(
        id,
        oldPassword,
        password
      );
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  updatAvatar: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
      const user = <UserInterface>req.user;
      const id = <string>user._id;
      const file = <Express.MulterS3.File>req.file;
      const avi = { key: file.key, url: file.location };

      const result = await userService.updateAvatar(id, avi);
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  updateShopAvatar: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) throw new Error(constants.MESSAGES.INTERNAL_SERVER_ERROR);
      const user = <UserInterface>req.user;
      const id = <string>user._id;
      const file = <Express.MulterS3.File>req.file;
      const avi = { key: file.key, url: file.location };

      const result = await userService.updateShopAvatar(id, avi);
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  updateFullname: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = <UserInterface>req.user;
      const id = <string>user._id;
      const fullname = req.body.fullname;
      const result = await userService.updateFullname(id, fullname);
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  getMe: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = <UserInterface>req.user;
      const id = <string>user._id;
      const result = await userService.getMe(id);
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  shop: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.sellerId;
      const result = await userService.shop(id);
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  shops: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.shops();
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  verify: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = <UserInterface>req.user;
      const id = <string>user._id;
      const data: UserInterface['verification'] = {};
      data.bvn = req.body.bvn;
      data.nin = req.body.nin;
      data.CACnumber = req.body.CACnumber;
      const file = <Express.MulterS3.File[]>req.files;
      if (Object.entries(file).length >= 2)
        data.CACdocument = { key: file[1].key, url: file[1].location };
      if (Object.entries(file).length >= 1)
        data.ninDocument = { key: file[0].key, url: file[0].location };
      const result = await userService.verify(data, id);
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
  editShop: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = <UserInterface>req.user;
      const id = <string>user._id;
      const data: Partial<UserInterface['store']> = {};
      data.bankAccountName = req.body.bankAccountName;
      data.bankAccountNumber = req.body.bankAccountNumber;
      data.bankName = req.body.bankName;
      data.desc = req.body.desc;
      data.phone = req.body.phone;
      data.name = req.body.name;
      if (req.file) {
        const file = <Express.MulterS3.File>req.file;
        data.banner = { key: file.key, url: file.location };
      }

      const result = await userService.editShop(data, id);
      SuccessResponse.send(res, result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      next(error);
    }
  },
};
