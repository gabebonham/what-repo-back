import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './service/category.service';
import { InjectablesModule } from 'src/shared/injectables.module';
import { AuthModule } from 'src/auth/auth.module';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  imports: [InjectablesModule, AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService, ...drizzleProvider],
  exports: [CategoryService],
})
export class CategoryModule {}
