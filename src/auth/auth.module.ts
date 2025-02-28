import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../api/user/user.module';
import { LoginAttempt, LoginAttemptSchema } from './schemas/auth.schema';

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([{ name: LoginAttempt.name, schema: LoginAttemptSchema }]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})

export class AuthModule { }