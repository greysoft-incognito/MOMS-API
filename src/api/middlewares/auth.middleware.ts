import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../helpers/response';
import constants from '../../config/constants';
import passport from 'passport';

export default {
  userIsAuth: (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
      next();
    } else next(new ErrorResponse(constants.MESSAGES.UNAUTHORIZED, 401));
  },

  sellerIsAuth: passport.authenticate('jwt', { session: false }), //TODO
};
