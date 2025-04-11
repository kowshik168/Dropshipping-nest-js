import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignupController } from './signup/signup.controller';
import { SignupService } from './signup/signup.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { ShopkeeperService } from './shopkeeper/shopkeeper.service';
import { ShopkeeperController } from './shopkeeper/shopkeeper.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),

    // GraphQLModule.forRoot(/*{
    //   driver: ApolloDriver,
    //   autoSchemaFile: true, // Auto-generate schema
    // }*/),
  ],
  controllers: [
    AppController,
    SignupController,
    LoginController,
    ShopkeeperController,
  ],
  providers: [AppService, SignupService, LoginService, ShopkeeperService],
})
export class AppModule {}
