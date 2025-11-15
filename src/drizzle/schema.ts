import { pgTable, uuid, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm';
import { primaryKey } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  roles: text('roles'),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),

  name: varchar('name', { length: 100 }),
  userId: uuid('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  imageUrl: text('image_url'),

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

  authorId: uuid('author_id').references(() => profiles.id, {
    onDelete: 'set null',
  }),

  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
export type GroupDb = InferSelectModel<typeof groups>;
export type NewGroupDb = InferInsertModel<typeof groups>;
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

export const profileRelations = relations(profiles, ({ many }) => ({
  profileGroups: many(profileGroups),
}));

export const groupsRelations = relations(groups, ({ many }) => ({
  profileGroups: many(profileGroups),
}));
export const profileToGroupsRelations = relations(profileGroups, ({ one }) => ({
  profile: one(profiles, {
    fields: [profileGroups.profileId],
    references: [profiles.id],
  }),
  group: one(groups, {
    fields: [profileGroups.groupId],
    references: [groups.id],
  }),
}));
