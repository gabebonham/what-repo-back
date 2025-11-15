import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { GroupController } from './controllers/group.controller';
import { GroupService } from './service/group.service';
import { InjectablesModule } from 'src/shared/injectables.module';
import { AuthModule } from 'src/auth/auth.module';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [InjectablesModule, AuthModule, ProfileModule],
  controllers: [GroupController],
  providers: [GroupService, ...drizzleProvider],
  exports: [GroupService],
})
export class GroupModule {}
