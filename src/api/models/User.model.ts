import { model, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserInterface } from '../interfaces/User.Interface';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please provide avalid email',
      ],
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      minlength: 8,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ['buyer', 'seller', 'admin'],
    },

    resetToken: { type: String },
    verificationToken: { type: String },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.comparePasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, <string>config.jwt.secret, {
    expiresIn: config.jwt.timeout,
  });
};

const User: Model<UserInterface> = model('user', userSchema);
export default User;
