import { Document } from 'mongoose';

interface UserInterface extends Document {
  email: string;
  fullname: string;
  password: string;
  role: string;
  verifiedEmail: boolean;
  verificationToken?: string;
  resetToken?: string;
  avatar?: string;
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
  comparePasswords(password: string): boolean;
  getSignedToken(): string;
}

export { UserInterface };
