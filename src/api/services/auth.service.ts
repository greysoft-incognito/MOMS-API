import User from '../models/User.model';
import { ErrorResponse } from '../helpers/response';
import constants from '../../config/constants';

export default {
  login: async (data: { email: string; password: string }) => {
    try {
      const user = await User.findOne({ email: <string>data.email }).select(
        '+password'
      );
      if (!user)
        throw new ErrorResponse(
          constants.MESSAGES.INVALID_CREDENTIALS,
          constants.ERROR_STATUS_CODE.UNAUTHORIZED
        );
      const isMatch = await user.comparePasswords(data.password);
      if (!isMatch)
        throw new ErrorResponse(
          constants.MESSAGES.INVALID_CREDENTIALS,
          constants.ERROR_STATUS_CODE.UNAUTHORIZED
        );
      const token = user.getSignedToken();
      return { token, user };
    } catch (error: any) {
      throw new Error(error);
    }
  },
  // oAuthLogin: async(data)=>{
  //   try {

  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // },
  BuyerRegistration: async (data: {
    email: string;
    name?: string;
    password?: string;
  }) => {
    try {
      let array: string[] | undefined = undefined;
      const user = await User.findOne({ email: <string>data.email }).select(
        '+password'
      );
      if (user) throw new ErrorResponse(constants.MESSAGES.USER_EXISTS, 406);
      if (data.name === undefined && data.password === undefined) {
        array = data.email.split('@');
        data.name = array[0];
        data.password = Math.floor(Math.random() * 10000000).toString();
      }
      const result = await User.create(data);
      if (array !== undefined) {
        return { result, password: data.password };
      } else return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  // oAuthSeller: async(data)=>{
  //   try {

  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // },
  sellerRegistration: async (data: {
    email: string;
    name?: string;
    password?: string;
  }) => {
    try {
      const user = await User.findOne({ email: <string>data.email }).select(
        '+password'
      );
      if (user) throw new ErrorResponse(constants.MESSAGES.USER_EXISTS, 406);

      const result = await User.create(data);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  verifyEmail: async (data: { token: string }) => {
    try {
      const user = await User.findOne({
        verificationToken: <string>data.token,
      });

      if (!user)
        throw new ErrorResponse(constants.MESSAGES.INVALID_CREDENTIALS, 406);

      user.verificationToken = undefined;
      const result = await user.save();
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getResetToken: async (data: { email: string }) => {
    try {
      const user = await User.findOne({ email: <string>data.email });

      if (!user)
        throw new ErrorResponse(constants.MESSAGES.INVALID_CREDENTIALS, 404);
      if (!user.resetToken) {
        const resetToken = [...crypto.getRandomValues(new Uint8Array(40))]
          .map((m) => ('0' + m.toString(16)).slice(-2))
          .join('');
        user.resetToken = resetToken;
        await user.save();
        return resetToken;
      } else return user.resetToken;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  resetPassword: async (data: { token: string; password: string }) => {
    try {
      const user = await User.findOne({ resetToken: data.token }).select(
        '+password'
      );

      if (!user)
        throw new ErrorResponse(constants.MESSAGES.INVALID_CREDENTIALS, 404);
      user.password = data.password;
      user.resetToken = undefined;
      await user.save();
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
