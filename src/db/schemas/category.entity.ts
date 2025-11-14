import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),

  name: text('name').notNull().unique(),
  icon: text('icon'),
  description: text('description'),
  link: text('link'),

  groupCount: integer('group_count').default(0).notNull(),
  imageUrl: text('image_url'),

  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
export type CategoryDb = InferSelectModel<typeof categories>;
export type NewCategoryDb = InferInsertModel<typeof categories>;
