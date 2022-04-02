import { Document } from 'mongoose';

interface UserInterface extends Document {
  email: string;
  fullname: string;
  password: string;
  role: string;
  verificationToken: string | undefined;
  resetToken: string | undefined;
  comparePasswords(password: string): boolean;
  getSignedToken(): string;
}

export { UserInterface };
