import mongoose from 'mongoose';

export default mongoose.model(
  'categories',
  new mongoose.Schema({}, { strict: false })
);
