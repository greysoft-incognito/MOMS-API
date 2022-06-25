import { ErrorResponse } from '../helpers/response';
import User from '../models/User.model';
import constants from '../../config/constants';
import { deleteUpload } from '../middlewares/s3';
import { OrderInterface } from '../interfaces/Order.interface';
import { UserInterface } from '../interfaces/User.Interface';

export default {
  updatePassword: async (id: string, oldPassword: string, password: string) => {
    try {
      const user = await User.findById(id).select('+password');
      if (!user) throw new ErrorResponse('user not found', 400);
      const match = await user.comparePasswords(oldPassword);
      if (!match) {
        throw new Error(constants.MESSAGES.PASSWORD_MATCH_ERROR);
      }
      user.password = password;
      const result = await user.save();
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updateAvatar: async (id: string, avi: { key: string; url: string }) => {
    try {
      const user = await User.findById(id);
      if (!user) throw new ErrorResponse('user not found', 400);
      if (user.avatar?.key) {
        await deleteUpload(user.avatar.key);
      }
      user.avatar = avi;
      const result = await user.save();
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updateShopAvatar: async (id: string, avi: { key: string; url: string }) => {
    try {
      const user = await User.findById(id);
      if (!user) throw new ErrorResponse('user not found', 400);
      if (user.store!.banner?.key) {
        await deleteUpload(user.store!.banner.key);
      }
      user.store!.banner = avi;
      const result = await user.save();
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updateFullname: async (id: string, fullname: string) => {
    try {
      const user = await User.findById(id);
      if (!user) throw new ErrorResponse('user not found', 400);
      user.fullname = fullname;
      const result = await user.save();
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getMe: async (id: string) => {
    try {
      const result = await User.findById(id);
      if (!result) throw new ErrorResponse('user not found', 400);
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  },
  shops: async () => {
    try {
      const result = await User.find({ role: 'seller' });
      if (!result) throw new ErrorResponse('user not found', 400);
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  },
  shop: async (id: string) => {
    try {
      const result = await User.findById(id);
      if (!result) throw new ErrorResponse('user not found', 400);
      if (result.role === 'buyer')
        throw new ErrorResponse('user not found', 400);
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  },
  verify: async (data: UserInterface['verification'], id: string) => {
    try {
      const result = await User.findById(id);
      if (!result) throw new ErrorResponse('user not found', 400);
      if (result.role === 'buyer')
        throw new ErrorResponse('user not found', 400);
      result.verification = data;
      await result.save();
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  },
  editShop: async (data: Partial<UserInterface['store']>, id: string) => {
    try {
      const result = await User.findById(id);
      if (!result) throw new ErrorResponse('user not found', 400);
      if (result.role === 'buyer')
        throw new ErrorResponse('user not found', 400);
      const arr = Object.keys(data);
      arr.map((val) => {
        result.store[val] = data[val];
      });
      await result.save();
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
