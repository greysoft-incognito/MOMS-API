import passport from 'passport';
import {
  Strategy as LocalStrategy,
  VerifyFunction,
  IStrategyOptions,
} from 'passport-local';
import User from '../models/User.model';
import { UserInterface } from '../interfaces/User.Interface';

import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
  VerifyCallback,
} from 'passport-jwt';
import config from '../../config/config';

// local strategy
const strategyOptions: IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
};
const verifyCallBackLocal: VerifyFunction = (
  username: string,
  password: string,
  done
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
const localStrategy = new LocalStrategy(strategyOptions, verifyCallBackLocal);

passport.use(localStrategy);

// jwt strategy
const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

const verifyCallBackJwt: VerifyCallback = function (payload, done) {
  User.findOne({ _id: payload.uid }).exec(function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user && user.role == 'seller') {
      done(null, user);
    } else {
      done(null, false);
    }
  });
};

const jwtStrategy = new JwtStrategy(options, verifyCallBackJwt);

passport.use(jwtStrategy);

// user serialization
passport.serializeUser((user, done) => {
  done(null, user);
});
// user deserialization
passport.deserializeUser((user: UserInterface, done) => {
  User.findById({ id: user._id })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
