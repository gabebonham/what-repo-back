import { log } from 'console';
import { UUID } from 'crypto';
import { User } from 'src/auth/entities/user.model';
import { Category } from 'src/category/models/category.model';
import { NewProfileDb } from 'src/db/schemas/profile.entity';
import { Group } from 'src/group/models/group.model';
export class Profile {
  id: UUID;
  name: string;
  imageUrl?: string;
  phone?: string;
  email: string;
  groups: Group[];
  userId?: string;
  user: User | null;
  createdAt: Date;
  constructor(
    id: UUID,
    name: string,
    email: string,
    groups: Group[],
    user: User | null,
    createdAt: Date,
    imageUrl?: string,
    phone?: string,
    userId?: string,
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.phone = phone;
    this.email = email;
    this.userId = userId;
    this.groups = groups;
    this.user = user;
    this.createdAt = createdAt;
  }
  static fromDb(row: any): Profile {
    let groups = [];
    const profile = row;
    if (row.profileGroups) {
      groups = row.profileGroups
        .map((gr: any) => gr.group)
        .map((gr: any) => Group.fromDb(gr));
    }
    return new Profile(
      profile.id,
      profile.name,
      profile.email,
      groups,
      profile.users,
      profile.created_at ?? row.createdAt,
      profile.image_url ?? row.imageUrl,
      profile.phone,
      profile.userId,
    );
  }
}
export type ProfileReq = NewProfileDb;
export type ProfilePatchReq = {
  id: UUID;
  name: string;
  imageUrl?: string;
  phone?: string;
  email: string;
  groups: Group[];
  userId?: string;
  user: User | null;
  createdAt: Date;
};
