import config from '../../config/config';
import User from '../models/User.model';
import Categories from '../models/Category.model';
import categoryData from './category.data';

export const UserSeeder = async () => {
  const defaultEmail: string = config.seeder.email as string;
  const defaultPassword: string = config.seeder.password as string;

  try {
    const admin = await User.findOne({
      email: defaultEmail,
    }).select('+password');

    if (!admin) {
      await User.create({
        email: defaultEmail,
        fullname: 'admin',
        password: defaultPassword,
        role: 'admin',
      });
    } else {
      admin.password = defaultPassword;
      await admin.save();
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const CategorySeeder = async () => {
  try {
    const cat = await Categories.findOne();

    if (!cat) {
      await Categories.create(categoryData);
    } else {
      cat.categories = categoryData.categories;
      await cat.save();
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
