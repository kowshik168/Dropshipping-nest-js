import { Controller, UseGuards,Req } from '@nestjs/common';
import { ShopkeeperService } from './shopkeeper.service';
import { Get, Post, Body } from '@nestjs/common';
import { ShopkeeperUpdateDto } from './update-details.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from '@nestjs/common';

@Controller('shopkeeper')
export class ShopkeeperController {

    constructor(private readonly shopkeeperService: ShopkeeperService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/dashboard')
    async get_details(@Request() req) {
        // Temporarily return decoded JWT payload to test
        return {
            message: 'Protected dashboard route',
            user: req.user,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('update-details')
    async update_details(@Req() req,@Body() body: ShopkeeperUpdateDto) {
        const { username, userId, role } = req.user;
        console.log("username:", username);
        return this.shopkeeperService.update_details(username,body);
    }


}
