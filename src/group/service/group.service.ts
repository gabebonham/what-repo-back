import { randomUUID, UUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { Group, GroupPatchReq, GroupReq } from '../models/group.model';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/drizzle/schema';
import { groups } from 'src/db/schemas/group.entity';
import { eq } from 'drizzle-orm';
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
      .where(eq(groups.id, id));
    return Group.fromDb(group);
  }
  async getGroups(): Promise<Group[]> {
    const groupList = await this.db
      .select()
      .from(schema.groups)
      .leftJoin(schema.categories, eq(groups.categoryId, schema.categories.id));
    return groupList.map((gr) => Group.fromDb(gr));
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
  async deleteGroup(id: string): Promise<Group> {
    const [newGroup] = await this.db
      .delete(schema.groups)
      .where(eq(groups.id, id))
      .returning();
    return Group.fromDb(newGroup);
  }
}
