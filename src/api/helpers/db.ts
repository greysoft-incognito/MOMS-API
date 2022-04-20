import mongoose from 'mongoose';
import config from '../../config/config';
import seeder from './seeder';
import constants from '../../config/constants';

export default () => {
  mongoose
    .connect(`${config.mongodb.url}`)
    .then(() => seeder())
    .then(() => console.log(constants.MESSAGES.SEED_ACCOUNT_CREATED))
    .then(() => console.log(constants.MESSAGES.MONGODB_CONNECTED))
    .catch((err) => {
      //console.log(err);
      //process.exit(0);
      throw new Error(err);
    });
};
