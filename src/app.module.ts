import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { InjectablesModule } from './shared/injectables.module';
import { ConfigModule } from '@nestjs/config';
import { drizzleProvider } from './drizzle/drizzle.provider';
import { GroupModule } from './group/group.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ProfileModule,
    GroupModule,
    CategoryModule,
    AuthModule,
    InjectablesModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [...drizzleProvider],
})
export class AppModule {}
