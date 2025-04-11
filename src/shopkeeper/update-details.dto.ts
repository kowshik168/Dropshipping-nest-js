import {IsString,IsNotEmpty,IsOptional,Matches,IsIn,} from 'class-validator';
  
  export class ShopkeeperUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Shop name cannot be empty' })
    shopName?: string;
  
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Address cannot be empty' })
    address?: string;
  
    @IsString()
    @Matches(/^[6-9]\d{9}$/, {
      message: 'Phone number must be a valid 10-digit Indian number',
    })
    phoneNumber: string;
  
    @IsString()
    @IsNotEmpty({ message: 'GST number is required' })
    // @Matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
    //   message: 'Invalid GST number format',
    // })
    gstNumber: string;
  
    @IsOptional()
    @IsIn(['active', 'inactive'], {
      message: 'Shop status must be either "active" or "inactive"',
    })
    shopStatus?: 'active' | 'inactive';
  }
  