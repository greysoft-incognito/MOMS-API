import config from './config/config';
import express, { Application } from 'express';
import cors from 'cors';
import logger from 'morgan';
import error404 from './api/middlewares/404handler';
import { errorHandler } from './api/middlewares/errorHandler';
import db from './config/db';
import authRoute from './api/routes/auth.route';

const app: Application = express();

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());

//routes
app.use('/api', authRoute);
app.use(errorHandler);
app.use('*', error404);

// database connection
db();

app.listen(config.port, () => {
  console.log(`running on port ${config.port}`);
});
