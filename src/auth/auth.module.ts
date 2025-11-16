import { Module } from '@nestjs/common';
import { AuthUtil } from './utils/auth.util';
import { AuthController } from './controllers/authcontroller';
import { UserService } from './services/user.service';
import { ProfileService } from './services/profile.service';
import { AuthService } from './services/auth.service';
import { drizzleProvider } from '../drizzle/drizzle.provider';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthUtil,
    ProfileService,
    UserService,
    ...drizzleProvider,
  ],
  exports: [AuthService, AuthUtil, UserService],
})
export class AuthModule {}
