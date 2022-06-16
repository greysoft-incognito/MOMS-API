import CategoryModel from '../models/Category.model';

export default {
  get: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await CategoryModel.findOne();
      return result;
    } catch (error) {
      throw error;
    }
  },
};
