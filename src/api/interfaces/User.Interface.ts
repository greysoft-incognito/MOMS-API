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
  store: [mongoose.Types.ObjectId];
  comparePasswords(password: string): boolean;
  getSignedToken(): string;
}

export type UserPassport = {
  user: mongoose.Types.ObjectId;
};
