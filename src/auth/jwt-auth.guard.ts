// auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    console.log('JWT Guard triggered → user:', user);
    console.log('Error:', err);
    console.log('Info:', info);
    return super.handleRequest(err, user, info, context);
  }
}
