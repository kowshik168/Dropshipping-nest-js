import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { logindto } from 'src/login/login.dto';
import mongoose from 'mongoose';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(Body: logindto) {
    const { username, password } = Body;

    const db = mongoose.createConnection(process.env.MONGO_URI + '/dropshipping');
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
        updates.lockUntil = new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000) + 30 * 60 * 1000);
      }

      await userCollection.updateOne({ username }, { $set: updates });

      return { message: 'Invalid credentials' };
    }

    // Reset lock and loginAttempts on success
    await userCollection.updateOne(
      { username },
      { $set: { loginAttempts: 0, lockUntil: null } }
    );

    // ✅ Create JWT payload
    const payload = { username: user.username, sub: user._id, role: user.userType };
    const token = this.jwtService.sign(payload);
    console.log('JWT_SECRET used:', process.env.JWT_SECRET);

    return {
      message: 'Login successful',
      access_token: token,
      userType: user.userType,
    };
  }
}
