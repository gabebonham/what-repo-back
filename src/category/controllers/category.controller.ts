import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { AuthGuard } from '../../shared/injectables/guards/auth-guard';
import type {
  Category,
  CategoryPatchReq,
  CategoryReq,
} from '../models/category.model';

@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.getCategoryById(id);
  }
  @Get()
  async getCategorys(): Promise<Category[]> {
    return await this.categoryService.getCategorys();
  }
  @UseGuards(AuthGuard)
  @Post()
  async createCategory(@Body() body: CategoryReq): Promise<Category> {
    return await this.categoryService.createCategory(body);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: CategoryPatchReq,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(id, body);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.deleteCategory(id);
  }
}
