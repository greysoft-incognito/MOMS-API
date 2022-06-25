import mongoose, { Document } from 'mongoose';

export interface UserInterface extends Document {
  email: string;
  fullname: string;
  password: string;
  role: 'buyer' | 'seller' | 'admin';
  verifiedEmail: boolean;
  verificationToken?: string;
  resetToken?: string;
  avatar: {
    key?: string;
    url?: string;
  };
  services: {
    google: {
      id?: string;
      token?: string;
    };
    facebook: {
      id?: string;
      token?: string;
    };
  };
  store: {
    name: string;
    desc: string;
    banner: {
      key?: string;
      url?: string;
    };
    products?: [mongoose.Types.ObjectId];

    phone: number;
    bankAccountNumber: string;
    bankAccountName: string;
    bankName: string;
    [key: string]: any;
  };
  verification: {
    bvn?: number;
    nin?: number;
    CACnumber?: string;
    ninDocument?: {
      key: string;
      url: string;
    };
    CACdocument?: {
      key: string;
      url: string;
    };
  };

  comparePasswords(password: string): boolean;
  getSignedToken(): string;
}

export type UserPassport = {
  user: mongoose.Types.ObjectId;
};
