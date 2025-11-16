import { Module } from '@nestjs/common';
import { AuthService } from '../auth/services/auth.service';
import { GroupController } from './controllers/group.controller';
import { GroupService } from './service/group.service';
import { InjectablesModule } from '../shared/injectables.module';
import { AuthModule } from '../auth/auth.module';
import { drizzleProvider } from '../drizzle/drizzle.provider';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [InjectablesModule, AuthModule, ProfileModule],
  controllers: [GroupController],
  providers: [GroupService, ...drizzleProvider],
  exports: [GroupService],
})
export class GroupModule {}
