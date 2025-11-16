import { Module } from '@nestjs/common';
import { AuthService } from '../auth/services/auth.service';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './service/profile.service';
import { InjectablesModule } from '../shared/injectables.module';
import { AuthModule } from '../auth/auth.module';
import { drizzleProvider } from '../drizzle/drizzle.provider';

@Module({
  imports: [InjectablesModule, AuthModule],
  controllers: [ProfileController],
  providers: [ProfileService, ...drizzleProvider],
  exports: [ProfileService],
})
export class ProfileModule {}
