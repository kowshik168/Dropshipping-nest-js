import { Controller } from '@nestjs/common';
import { ShopkeeperService } from './shopkeeper.service';
import { Get,Post,Body } from '@nestjs/common';
import { ShopkeeperUpdateDto } from './update-details.dto';
@Controller('shopkeeper')
export class ShopkeeperController {

    constructor(private readonly shopkeeperService:ShopkeeperService){}

    @Get('/dashboard')
    async get_details(){

    }

    @Post('update-details')
    async update_details(@Body() body:ShopkeeperUpdateDto){
        return this.shopkeeperService.update_details(body);
    }


}
