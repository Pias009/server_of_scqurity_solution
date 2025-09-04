import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD, MONGO_URI, SALT } from '../app/config';
import { UserModel } from '../modules/user/user.model';
import { EUserRole } from '../modules/user/user.interface';

const seedAdmin = async () => {
  try {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_NAME)
      throw new Error('Please add admin name, email, and password to .evn');

    await mongoose.connect(MONGO_URI!);

    const isAdminExist = await UserModel.findOne({ email: ADMIN_EMAIL });
    if (isAdminExist) throw new Error('Admin already exist');

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, SALT);

    const admin = await UserModel.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: EUserRole.admin,
    });
     
    if (!admin) throw new Error('Failed to create super admin');
    console.log('Admin created successfully');
    console.log('Name :', admin.name);
    console.log('Email :', admin.email);
    console.log('Password :', ADMIN_PASSWORD);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin();
