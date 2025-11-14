import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { AuthUtil } from './utils/auth.util';
import { AuthController } from './controllers/authcontroller';
import { UserService } from './services/user.service';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';
import { ProfileService } from './services/profile.service';

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
