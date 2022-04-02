import config from './config';
import User from '../api/models/User.model';

export default async () => {
  const defaultEmail: string = config.seeder.email as string;
  const defaultPassword: string = config.seeder.password as string;

  try {
    const admin = await User.findOne({
      email: defaultEmail,
    }).select('+password');

    if (!admin) {
      await User.create({
        email: defaultEmail,
        name: 'admin',
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
