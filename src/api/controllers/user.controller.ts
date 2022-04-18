import { Request, Response, NextFunction } from 'express';
import { SuccessResponse } from '../helpers/response';
import userService from '../services/user.service';
import constants from '../../config/constants';
import { UserInterface } from '../interfaces/User.Interface';

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
};
