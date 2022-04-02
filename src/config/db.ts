import mongoose from 'mongoose';
import config from './config';
import seeder from './seeder';
import * as constants from './constants';

export default () => {
  mongoose
    .connect(`${config.mongodb.url}`)
    .then(() => seeder())
    .then(() => console.log(constants.MESSAGES.SEED_ACCOUNT_CREATED))
    .then(() => console.log(constants.MESSAGES.MONGODB_CONNECTED))
    .catch((err) => console.log(err));
};
