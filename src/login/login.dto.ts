import { IsNotEmpty, IsString } from "class-validator";

export class logindto{
    @IsString()
    @IsNotEmpty({message:"The username field cannot be empty"})
    username: string

    @IsString()
    @IsNotEmpty({message:"Hey the password cannot be empty"})
    password:string
}