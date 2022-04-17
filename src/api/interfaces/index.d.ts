import 'express-session';
import { CartInterface } from '../interfaces/Order.interface';

declare module 'express-session' {
  interface SessionData {
    cart: CartInterface[] | null;
  }
}

declare global {
  namespace Express {
    interface User {
      _id?: string;
    }
    interface Request {
      file?: Express.Multer.File & Express.MulterS3.File;
      files?:
        | {
            [fieldname: string]: Multer.File[] & Express.MulterS3.File[];
          }
        | Multer.File[]
        | Express.MulterS3.File[]
        | undefined;
    }
  }
}
