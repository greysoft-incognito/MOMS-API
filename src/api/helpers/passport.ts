import passport from 'passport';
import {
  Strategy as LocalStrategy,
  VerifyFunction,
  IStrategyOptions,
} from 'passport-local';
import User from '../models/User.model';
import { UserInterface } from '../interfaces/User.Interface';

const strategyOptions: IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
};
const verifyCallBack: VerifyFunction = (
  username: string,
  password: string,
  done
) => {
  User.findOne({ email: username }, function cb(err: any, user: UserInterface) {
    if (err) {
      return done(err, false);
    }
    if (!user) {
      return done(null, false);
    }
    if (!user.comparePasswords(password)) {
      return done(null, false);
    }
    return done(null, user);
  });
};
const localStrategy = new LocalStrategy(strategyOptions, verifyCallBack);

passport.use(localStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: UserInterface, done) => {
  User.findById({ id: user._id })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
