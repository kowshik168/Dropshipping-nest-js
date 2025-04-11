import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { signupdto } from './signup.dto';
import { SignupService } from './signup.service';
@Controller('signup')
export class SignupController {

    constructor(private readonly signupService:SignupService){}

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    validate_and_register_user(@Body() body:signupdto){
        return this.signupService.validate_and_register(body)
    }
}
