import config from './config/config';
import express, { Application } from 'express';
import cors from 'cors';
import logger from 'morgan';
import error404 from './api/middlewares/404handler';
import { errorHandler } from './api/middlewares/errorHandler';
import db from './api/helpers/db';
import authRoute from './api/routes/auth.route';
import passport from 'passport';
import './api/helpers/passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';

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
    // httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
  },
};

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(session(Session));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/api', authRoute);
app.use(errorHandler);
app.use('*', error404);

// database connection
db();

app.listen(config.port, () => {
  console.log(`running on port ${config.port}`);
});
