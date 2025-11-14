import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import { groups } from './group.entity';
import { pgTable, uuid, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { primaryKey } from 'drizzle-orm/pg-core';
import { users } from './user.entity';

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),

  name: varchar('name', { length: 100 }),

  imageUrl: text('image_url'),
  authorId: uuid('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  email: varchar('email', { length: 255 }).notNull().unique(),

  phone: varchar('phone', { length: 20 }),

  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const profileGroups = pgTable(
  'profile_groups',
  {
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profiles.id, { onDelete: 'cascade' }),

    groupId: uuid('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.profileId, table.groupId] }),
  }),
);
export type ProfileDb = InferSelectModel<typeof profiles>;
export type NewProfileDb = InferInsertModel<typeof profiles>;
