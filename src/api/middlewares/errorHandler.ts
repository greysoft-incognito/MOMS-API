import { ErrorResponse } from '../helpers/response';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: ErrorResponse | Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const error = { ...err };

  error.message = err.message;

  // if (err.code === 11000) {
  //   const message = 'Duplicate Field Value';
  //   error = new ErrorResponse(message, 400);
  // }

  // if (err.name === 'ValidationError') {
  //   const message = Object.values(err.errors).map((val) => val.message);
  //   error = new ErrorResponse(message, 400);
  // }

  let statusCode: number;
  if ('statusCode' in error) {
    statusCode = error.statusCode;
  } else {
    statusCode = 500;
  }

  res.status(statusCode).json({
    sucess: false,
    message: error.message || 'Server Error',
    error,
  });
};

export { errorHandler };
