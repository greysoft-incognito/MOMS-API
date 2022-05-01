import config from './config/config';
import express, { Application } from 'express';
import cors from 'cors';
import logger from 'morgan';
import error404 from './api/middlewares/404handler';
import docs from './api/middlewares/docs';
import { errorHandler } from './api/middlewares/errorHandler';
import authMiddleware from './api/middlewares/auth.middleware';
import db from './api/helpers/db';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
// Routes
import authRoute from './api/routes/auth.route';
import userRoute from './api/routes/user.route';
import productRoute from './api/routes/product.route';
import searchRoute from './api/routes/search.route';
import cartRoute from './api/routes/cart.route';
import cookieParser from 'cookie-parser';

require('./api/helpers/passport');

const app: Application = express();

const store = MongoStore.create({
  mongoUrl: <string>config.mongodb.url,
  collectionName: 'sessions',
});

const Session: session.SessionOptions = {
  secret: <string>config.sessionToken,
  resave: false,
  store,
  saveUninitialized: true,
  cookie: {
    // path: '/',
    httpOnly: false,
    sameSite: 'none',
    secure: false,
    maxAge: undefined, //1000 * 60 * 60 * 24,
  },
};

//middlewares
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:8080', 'http://192.168.130.74:8080'],
    //exposedHeaders: ['set-cookie'],
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(session(Session));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/docs', docs);
app.use('/api', authRoute);
app.use('/api/product', authMiddleware.sellerIsAuth, productRoute);
app.use('/api/search', searchRoute);
app.use('/api/me', authMiddleware.userIsAuth, userRoute);
app.use('/api/cart', cartRoute);

app.use(errorHandler);
app.use('*', error404);

// database connection
db();
// const ip = '192.168.130.155';
app.listen(
  config.port as unknown as number,
  //  ip,
  () => {
    console.log(`running on port ${config.port}`);
  }
);
