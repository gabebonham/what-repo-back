import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './service/profile.service';
import { InjectablesModule } from 'src/shared/injectables.module';
import { AuthModule } from 'src/auth/auth.module';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  imports: [InjectablesModule, AuthModule],
  controllers: [ProfileController],
  providers: [ProfileService, ...drizzleProvider],
  exports: [ProfileService],
})
export class ProfileModule {}
