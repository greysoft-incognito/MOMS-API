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
  }
}
