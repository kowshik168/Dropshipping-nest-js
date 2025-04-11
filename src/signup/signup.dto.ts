import {IsString,IsEmail,IsNotEmpty,MinLength,MaxLength,Matches,IsIn} from 'class-validator'

export class signupdto{
    // Username validation
    @IsString()
    @IsNotEmpty({ message: 'Username cannot be empty' })
    @MinLength(3, { message: 'Username must be at least 3 characters long' })
    @MaxLength(20, { message: 'Username cannot exceed 20 characters' })
    username: string;

    // Password validation
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
    })
    @Matches(/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/, {
    message: 'Password must contain at least one special character',
    })
    password: string;

    @IsString()
    @IsEmail({},{message:"The email given is invalid"})
    email:string;

    @IsNotEmpty()
    @IsIn(['customer', 'shopkeeper','admin'], { message: 'User type must be either customer or shopkeeper' })
    userType: 'customer' | 'shopkeeper' | 'admin';

}