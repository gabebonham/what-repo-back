import { randomUUID, UUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { Profile, ProfilePatchReq, ProfileReq } from '../models/profile.model';
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
  async getProfileById(id: string): Promise<Profile> {
    const [profile] = await this.db
      .select()
      .from(schema.profiles)
      .where(eq(profiles.id, id));
    return Profile.fromDb(profile);
  }
  async getProfiles(): Promise<Profile[]> {
    const profiles = await this.db.select().from(schema.profiles);
    return profiles.map(Profile.fromDb);
  }
  async createProfile(profile: ProfileReq): Promise<Profile> {
    const [newProfile] = await this.db
      .insert(schema.profiles)
      .values(profile)
      .returning();
    return Profile.fromDb(newProfile);
  }
  async updateProfile(id: string, profile: ProfilePatchReq): Promise<Profile> {
    const [newProfile] = await this.db
      .update(schema.profiles)
      .set(profile)
      .where(eq(profiles.id, id))
      .returning();
    return Profile.fromDb(newProfile);
  }
  async deleteProfile(id: string): Promise<Profile> {
    const [newProfile] = await this.db
      .delete(schema.profiles)
      .where(eq(profiles.id, id))
      .returning();
    return Profile.fromDb(newProfile);
  }
}
