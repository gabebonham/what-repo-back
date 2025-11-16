import { randomUUID, UUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { Group, GroupPatchReq, GroupReq } from '../models/group.model';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../../drizzle/schema';
import { groups } from '../../db/schemas/group.entity';
import { and, eq } from 'drizzle-orm';
@Injectable()
export class GroupService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
  ) {}
  async getGroupById(id: string): Promise<Group> {
    const [group] = await this.db
      .select()
      .from(schema.groups)
      .leftJoin(schema.categories, eq(groups.categoryId, schema.categories.id))
      .leftJoin(schema.profiles, eq(groups.authorId, schema.profiles.id))
      .where(eq(groups.id, id));
    return Group.fromDb(group.groups, group.categories, group.profiles);
  }
  async getGroupsByCategory(category: string): Promise<Group[]> {
    const groupList = await this.db
      .select()
      .from(schema.groups)
      .leftJoin(schema.categories, eq(schema.categories.name, category))
      .leftJoin(schema.profiles, eq(groups.authorId, schema.profiles.id))
      .where(eq(schema.groups.categoryId, schema.categories.id));

    return groupList.map((gr) =>
      Group.fromDb(gr.groups, gr.categories, gr.profiles),
    );
  }
  async getGroupByProfileId(id: string): Promise<Group[]> {
    const groupList = await this.db
      .select()
      .from(schema.groups)
      .leftJoin(schema.categories, eq(groups.categoryId, schema.categories.id))
      .leftJoin(schema.profiles, eq(groups.authorId, schema.profiles.id))
      .where(eq(groups.authorId, id));
    return groupList.map((gr) =>
      Group.fromDb(gr.groups, gr.categories, gr.profiles),
    );
  }
  async getGroups(): Promise<Group[]> {
    const groupList = await this.db
      .select()
      .from(schema.groups)
      .leftJoin(schema.categories, eq(groups.categoryId, schema.categories.id))
      .leftJoin(schema.profiles, eq(groups.authorId, schema.profiles.id));
    return groupList.map((gr) =>
      Group.fromDb(gr.groups, gr.categories, gr.profiles),
    );
  }
  async createGroup(group: GroupReq): Promise<Group> {
    const [newGroup] = await this.db.insert(groups).values(group).returning();
    return Group.fromDb(newGroup);
  }
  async updateGroup(id: string, group: GroupPatchReq): Promise<Group> {
    const [newGroup] = await this.db
      .update(schema.groups)
      .set(group)
      .where(eq(groups.id, id))
      .returning();
    return Group.fromDb(newGroup);
  }
  async joinGroup(id: string, profileId: string): Promise<void> {
    const result = await this.db
      .select()
      .from(schema.profileGroups)
      .where(
        eq(schema.profileGroups.groupId, id) &&
          eq(schema.profileGroups.profileId, profileId),
      );
    const exists = result.length > 0;

    if (exists) {
      await this.db
        .delete(schema.profileGroups)
        .where(
          and(
            eq(schema.profileGroups.groupId, id),
            eq(schema.profileGroups.profileId, profileId),
          ),
        );
    } else {
      await this.db
        .insert(schema.profileGroups)
        .values({ profileId: profileId, groupId: id })
        .returning();
    }
  }
  async deleteGroup(id: string): Promise<Group> {
    const [newGroup] = await this.db
      .delete(schema.groups)
      .where(eq(groups.id, id))
      .returning();
    return Group.fromDb(newGroup);
  }
}
