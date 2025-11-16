import { randomUUID, UUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import {
  Category,
  CategoryPatchReq,
  CategoryReq,
} from '../models/category.model';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../../drizzle/schema';
import { categories } from '../../db/schemas/category.entity';
import { eq } from 'drizzle-orm';
@Injectable()
export class CategoryService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
  ) {}
  async getCategoryById(id: string): Promise<Category> {
    const [category] = await this.db
      .select()
      .from(schema.categories)
      .where(eq(categories.id, id));
    return Category.fromDb(category);
  }
  async getCategorys(): Promise<Category[]> {
    const categorys = await this.db.select().from(schema.categories);
    return categorys.map(Category.fromDb);
  }
  async createCategory(category: CategoryReq): Promise<Category> {
    const [newCategory] = await this.db
      .insert(schema.categories)
      .values(category)
      .returning();
    return Category.fromDb(newCategory);
  }
  async updateCategory(
    id: string,
    category: CategoryPatchReq,
  ): Promise<Category> {
    const [newCategory] = await this.db
      .update(schema.categories)
      .set(category)
      .where(eq(categories.id, id))
      .returning();
    return Category.fromDb(newCategory);
  }
  async deleteCategory(id: string): Promise<Category> {
    const [newCategory] = await this.db
      .delete(schema.categories)
      .where(eq(categories.id, id))
      .returning();
    return Category.fromDb(newCategory);
  }
}
