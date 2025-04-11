import { Injectable } from '@nestjs/common';
import { logindto } from './login.dto';
import mongoose from 'mongoose';
const bcrypt = require('bcrypt');

@Injectable()
export class LoginService {
  async validateUser(Body: logindto) {
    const { username, password } = Body;

    const db = mongoose.createConnection(process.env.MONGO_URI + '/users');
    const userCollection = db.collection('users');

    const user = await userCollection.findOne({ username });

if (!user) {
  return { message: 'User not found' };
}

if (user.lockUntil && new Date(user.lockUntil) > new Date()) {
  return { message: 'Account is locked. Try again later.' };
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  const attempts = user.loginAttempts || 0;
  const updates: any = { loginAttempts: attempts + 1 };

  if (attempts + 1 >= 3) {
    updates.lockUntil = new Date(Date.now() + 30 * 60 * 1000);
  }

  await userCollection.updateOne({ username }, { $set: updates });

  return { message: 'Invalid credentials' };
}

// Success: reset lock
await userCollection.updateOne(
  { username },
  { $set: { loginAttempts: 0, lockUntil: null } }
);

      
    return { message: 'Login successful', userType: user.userType };
  }
}
