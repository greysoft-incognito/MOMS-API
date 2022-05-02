import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, SuccessResponse } from '../helpers/response';
import authService from '../services/auth.service';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import { UserInterface, UserPassport } from '../interfaces/User.Interface';
import helper from '../helpers/helper';

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.login(req.body);
      SuccessResponse.send(res, result);
    } catch (error) {
      next(error);
    }
  },
  buyerReg: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.BuyerRegistration(req.body);
      req.login(result.result, (err) => {
        if (err) {
          throw new Error(err);
        }
      });
      SuccessResponse.send(res, result);
    } catch (error) {
      next(error);
    }
  },
  sellerReg: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.sellerRegistration(
        req.body,
        req.hostname
      );
      SuccessResponse.send(res, result);
    } catch (error) {
      next(error);
    }
  },
  verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.verifyEmail({ token: req.params.token });
      SuccessResponse.send(res, { message: 'user verified', user: result });
    } catch (error) {
      next(error);
    }
  },
  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.getResetToken(
        { email: req.body.email },
        req.hostname
      );
      //send mail
      SuccessResponse.send(res, { message: 'email sent', data: result });
    } catch (error) {
      next(error);
    }
  },
  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.resetPassword({
        token: req.params.token,
        password: req.body.password,
      });
      SuccessResponse.send(res, { success: result });
    } catch (error) {
      next(error);
    }
  },
  passportSaveHost: (req: Request, res: Response, next: NextFunction) => {
    req.session.key = helper.generateToken();
    req.session.host = <string>req.query?.host;
    next();
  },

  passportLogin: (req: Request, res: Response) => {
    if (req.session.host) {
      const user = req.user;
      const pass = req.session.passport;
      const key = req.session.key ? req.session.key : '';
      const userJwt = jwt.sign({ pass, user, key }, <string>config.jwt.secret, {
        expiresIn: 60,
      });
      res.redirect(`${req.session.host}?h=${userJwt}`);
    } else {
      SuccessResponse.send(res, {
        success: true,
        message: 'user logged in successfully',
      });
    }
  },
  login2: (req: Request, res: Response) => {
    if (!req.user) {
      const userJwt = <string>req.query.h;
      console.log(userJwt);

      const pay = jwt.verify(userJwt, <string>config.jwt.secret);
      const payload = pay as unknown as {
        user: UserInterface;
        pass: UserPassport;
        key: string;
      };

      req.session.passport = payload.pass;
      req.user = payload.user;
      // const key = payload.key;
      // if (key !== req.session.key) throw new ErrorResponse('invalid user', 400); //TODO
      SuccessResponse.send(res, { user: payload.user });
    } else SuccessResponse.send(res, { user: req.user });
  },

  logout: (req: Request, res: Response /*, next: NextFunction*/) => {
    req.logout();
    // req.session.destroy((err) => {
    //   if (err) next(err);
    // });
    SuccessResponse.send(res, { message: 'successfully logged out ' });
  },
};
