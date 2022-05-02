import 'express-session';
import { CartInterface } from './Order.interface';
// import { UserInterface } from './User.Interface';

declare module 'express-session' {
  interface SessionData {
    cart?: CartInterface[];
    host: string;
    passport: UserPassport;
    key: string;
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
      //user?: /*Express.User |*/ UserInterface;
    }
  }
}
