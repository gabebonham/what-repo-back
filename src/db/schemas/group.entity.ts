import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import { users } from './user.entity'; // adjust path as needed
import { categories } from './category.entity';

export const groups = pgTable('groups', {
  id: uuid('id').defaultRandom().primaryKey(),

  name: text('name').notNull(),
  categoryId: uuid('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
  userCount: integer('user_count').default(0).notNull(),
  imageUrl: text('image_url'),
  link: text('link'),
  description: text('description'),

  rules: text('rules'),

  banned: boolean('banned').default(false).notNull(),
  whatsLink: text('whats_link'),

  authorId: uuid('author_id').references(() => users.id, {
    onDelete: 'set null',
  }),

  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
export type GroupDb = InferSelectModel<typeof groups>;
export type NewGroupDb = InferInsertModel<typeof groups>;
