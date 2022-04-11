import User from '../models/User.model';
import { ErrorResponse } from '../helpers/response';
import constants from '../../config/constants';
import Emailing from '../helpers/Emailing';
import { To } from '../interfaces/Mail.interface';
import helper from '../helpers/helper';

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
        data.password = helper.generateToken().slice(0, 9); //Math.floor(Math.random() * 10000000).toString();
        const mail: To = {
          to: { name: data.name, email: data.email },
          url: data.password,
        };
        const email = new Emailing(mail);
        await email.newPassword(); //TODO
        const result = await User.create(data);
        return { result, message: constants.MESSAGES.NEW_PASSWORD };
      }

      const result = await User.create(data);
      return { result, message: constants.MESSAGES.NEW_PASSWORD };
    } catch (error: any) {
      throw new Error(error);
    }
  },

  sellerRegistration: async (
    data: {
      email: string;
      name: string;
      password: string;
      verificationToken?: string;
    },
    url: string
  ) => {
    try {
      const user = await User.findOne({ email: <string>data.email }).select(
        '+password'
      );
      if (user) throw new ErrorResponse(constants.MESSAGES.USER_EXISTS, 406);

      const token = helper.generateToken();
      data.verificationToken = token;
      const result = await User.create(data);
      const mail: To = {
        to: { name: data.name, email: data.email },
        url: `${url}/api/user/verify-email/${token}`,
      };
      const email = new Emailing(mail);
      await email.forgotPassword();
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

      user.verifiedEmail = true;
      user.verificationToken = undefined;
      const result = await user.save();
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getResetToken: async (data: { email: string }, url: string) => {
    try {
      let resetToken: string;
      const user = await User.findOne({ email: <string>data.email });
      if (!user)
        throw new ErrorResponse(constants.MESSAGES.INVALID_CREDENTIALS, 404);
      if (!user.resetToken) {
        resetToken = helper.generateToken();
        user.resetToken = resetToken;
        await user.save();
      } else {
        resetToken = user.resetToken;
      }
      const mail: To = {
        to: { name: user.fullname, email: data.email },
        url: `${url}/api/user/reset-password/${resetToken}`,
      };
      const email = new Emailing(mail);
      await email.forgotPassword();
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
