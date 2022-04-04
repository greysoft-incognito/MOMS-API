import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../helpers/response';
import * as constants from '../../config/constants';

export default {
  userIsAuth: (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      next();
    } else next(new ErrorResponse(constants.MESSAGES.UNAUTHORIZED, 401));
  },
};
