import { Body, Injectable } from '@nestjs/common';
import { signupdto } from './signup.dto';
import mongoose from 'mongoose';
const bcrypt = require('bcrypt');


@Injectable()
export class SignupService {

    async validate_and_register(@Body() Body:signupdto){
        //First check if the username is already existing in the current database
        //If present,return a message saying that username is already taken
        const {username,password,email,userType}=Body;
        const db = mongoose.createConnection(process.env.MONGO_URI + '/users');
        const userCollection=db.collection('users');

        if(userType=="admin"){
            const admin =await userCollection.findOne({userType:"admin"})
            if(admin){
                return {message:"Only one admin can be present"}
            }

        }   

        const existingUser=await userCollection.findOne({username: username});
        if(existingUser){
            return  {message:"Username already exists.Please use another username"}
        }

       
        console.log('bcrypt is:', bcrypt);

        const saltrounds= 10;
        const hashedPassword= await bcrypt.hash(password,saltrounds)

        const usertosave={
            username:username,
            password:hashedPassword,
            email:email,
            userType:userType,
            createdAt: new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000)).toISOString(),
            loginAttempts:0,
            lockUntil:null

        }

        /*Now if the username is not present, Allow him to create an account.
        Add a password verifier to ensure it consists the minimum requirements to be a strong password
        8 character, 1 capital, 1 special character.Don't allow if it misses any of the conditions.
        */
        await userCollection.insertOne(usertosave);

        return {message:"User successfully registered"}


        //Store his password using bcrypt so that even if data is exposed users will remain safe.


    }
}
