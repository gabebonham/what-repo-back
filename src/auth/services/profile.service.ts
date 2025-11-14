import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/drizzle/schema';
import { profiles } from 'src/db/schemas/profile.entity';
import { eq } from 'drizzle-orm';
@Injectable()
export class ProfileService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async createProfile(profile: any): Promise<any> {
    const newProfile = await this.db
      .insert(schema.profiles)
      .values(profile)
      .returning();
    return newProfile;
  }
  async updateProfile(id: string, profile: any): Promise<any> {
    const newProfile = await this.db
      .update(schema.profiles)
      .set(profile)
      .where(eq(profiles.id, id))
      .returning();
    return newProfile;
  }
}
