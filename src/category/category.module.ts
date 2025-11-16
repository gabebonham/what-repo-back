import { Module } from '@nestjs/common';
import { AuthService } from '../auth/services/auth.service';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './service/category.service';
import { InjectablesModule } from '../shared/injectables.module';
import { AuthModule } from '../auth/auth.module';
import { drizzleProvider } from '../drizzle/drizzle.provider';

@Module({
  imports: [InjectablesModule, AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...drizzleProvider],
  exports: [CategoryService],
})
export class CategoryModule {}
