import { randomUUID, UUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { Profile, ProfilePatchReq, ProfileReq } from '../models/profile.model';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/drizzle/schema';
import { profileGroups, profiles } from 'src/db/schemas/profile.entity';
import { eq } from 'drizzle-orm';
import { groups } from 'src/db/schemas/group.entity';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
  ) {}
  async getProfileById(id: string): Promise<Profile> {
    const profile = await this.db.query.profiles.findFirst({
      where: eq(profiles.id, id),
      with: {
        profileGroups: {
          with: {
            group: true,
          },
        },
      },
    });
    return Profile.fromDb(profile);
  }
  async getProfileByUserId(id: string): Promise<Profile> {
    const profile = await this.db.query.profiles.findFirst({
      where: eq(profiles.authorId, id),
      with: {
        profileGroups: {
          with: {
            group: true,
          },
        },
      },
    });
    return Profile.fromDb(profile);
  }
  async getProfiles(): Promise<Profile[]> {
    const profiles = await this.db.query.profiles.findMany({
      with: {
        profileGroups: {
          with: {
            group: true,
          },
        },
      },
    });
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
