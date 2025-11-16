import { Module } from '@nestjs/common';
import { AuthGuard } from './injectables/guards/auth-guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [],
  providers: [AuthGuard],
  exports: [AuthGuard],
  imports: [AuthModule],
})
export class InjectablesModule {}
