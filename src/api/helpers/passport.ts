/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

import {
  Profile,
  Strategy as GoogleStrategy,
  StrategyOptions as GoogleStrategyOptions,
} from 'passport-google-oauth20';
import {
  Strategy as FacebookStrategy,
  StrategyOption as FacebookStrategyOption,
  VerifyFunction as FacebookVerifyFunction,
} from 'passport-facebook';

import config from '../../config/config';
import util from 'util';
import helper from './helper';

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
  User.findOne(
    { email: username },
    '+password',
    function cb(err: any, user: UserInterface) {
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
    }
  );
};
const localStrategy = new LocalStrategy(strategyOptions, verifyCallBackLocal);

passport.use(localStrategy);

// jwt strategy
const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

const verifyCallBackJwt: VerifyCallback = function (payload, done) {
  User.findOne({ _id: payload.id }).exec(function (err, user) {
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

// facebook strategy

const fbVerifyFunction: FacebookVerifyFunction = function (
  accessToken,
  refreshToken,
  profile,
  done
) {
  // asynchronous
  process.nextTick(function () {
    // find the user in the database based on their facebook id
    User.findOne(
      { email: profile._json.email },
      function (err: any, user: UserInterface) {
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) return done(err);

        // if the user is found, then log them in
        if (user) {
          if (user.avatar?.url) {
            return done(null, user); // user found, return that user
          } else {
            user.avatar.key = undefined;
            user.avatar.url = util.format(
              'http://graph.facebook.com/%s/picture?type=large',
              profile.id
            );
            user.save(function (err, data) {
              if (err) throw err;

              // if successful, return the user
              return done(null, data);
            });
          }
        } else {
          // if there is no user found with that facebook id, create them
          const newUser = new User();

          // set all of the facebook information in our user model
          newUser.services.facebook.id = profile.id;
          newUser.services.facebook.token = accessToken;
          newUser.fullname = `{${profile._json.first_name} ${profile._json.last_name}`;
          newUser.email = profile._json.email;
          newUser.password = helper.generateToken().slice(0, 9);
          newUser.avatar!.url = util.format(
            'http://graph.facebook.com/%s/picture?type=large',
            profile.id
          );
          newUser.role = 'buyer';

          // new_user.new = true;
          // save our user to the database
          newUser.save(function (err) {
            if (err) {
              throw err;
            }
            // if successful, return the new user
            return done(null, newUser);
          });
        }
      }
    );
  });
};
const fbStrategyOption: FacebookStrategyOption = config.facebook;

const facebookStrategy = new FacebookStrategy(
  fbStrategyOption,
  fbVerifyFunction
);

passport.use(facebookStrategy);

// google strategy
const googleOptions: GoogleStrategyOptions = config.google;

const googleStrategy = new GoogleStrategy(
  googleOptions,
  (accessToken, refreshToken, profile: Profile, done) => {
    User.findOne(
      { email: profile._json.email },
      function (err: any, user: UserInterface) {
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) return done(err);

        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          // if there is no user found with that facebook id, create them
          const newUser = new User();

          // set all of the facebook information in our user model
          newUser.services.google.id = profile.id;
          newUser.services.google.token = accessToken;
          newUser.fullname = `${profile.name?.familyName} ${profile.name?.givenName}`;
          newUser.email = <string>profile._json.email;
          newUser.avatar.url = <string>profile._json.picture;
          newUser.password = helper.generateToken().slice(0, 9);
          newUser.role = 'buyer';

          // save our user to the database
          newUser.save(function (err, new_user) {
            if (err) return done(err);
            // if successful, return the new user
            else return done(null, new_user);
          });
        }
      }
    );
  }
);
passport.use(googleStrategy);

type UserT = {
  _id?: string;
};

// user serialization
passport.serializeUser((user: UserT, done) => {
  done(null, user._id);
});
// user deserialization
passport.deserializeUser((userid, done) => {
  User.findById(userid)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
