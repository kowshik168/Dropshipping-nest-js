import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { logindto } from 'src/login/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: logindto) {
    return this.authService.validateUser(body);
  }
}
