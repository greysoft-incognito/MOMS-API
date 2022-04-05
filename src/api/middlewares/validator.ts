import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../helpers/response';
// import constants from '../../../config/constants.js';
// import fs from 'fs';

const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = errors.array();
    throw new ErrorResponse('user input validation error', 400, error);
  }
  next();
};

export default validator;
