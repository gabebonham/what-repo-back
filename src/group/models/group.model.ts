import { UUID } from 'crypto';
import { User } from '../../auth/entities/user.model';
import { Category } from '../../category/models/category.model';
import { NewCategoryDb } from '../../db/schemas/category.entity';
import { NewGroupDb } from '../../drizzle/schema';
import { Profile } from '../../profile/models/profile.model';

export class Group {
  id: UUID;
  name: string;
  category?: Category;
  categoryId?: UUID;
  userCount: number;
  imageUrl?: string;
  link?: string;
  description: string;
  verified: boolean;
  author?: Profile | null;
  authorId?: UUID | null;
  rules?: string[];
  banned: boolean;
  whatsLink: string;
  createdAt: Date;
  constructor(
    id: UUID,
    name: string,
    categoryId: UUID,
    userCount: number,
    imageUrl: string,
    link: string,
    description: string,
    rules: string[],
    banned: boolean,
    whatsLink: string,
    createdAt: Date,
    category?: Category,
    user?: Profile,
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.categoryId = categoryId;
    this.category = category;
    this.userCount = userCount;
    this.link = link;
    this.description = description;
    this.rules = rules;
    this.banned = banned;
    this.whatsLink = whatsLink;
    this.createdAt = createdAt;
    this.author = user;
  }
  static fromDb(row: any, cat?: any, pr?: any): Group {
    return new Group(
      row.id,
      row.name,
      row.categoryId,
      row.userCount,
      row.imageUrl,
      row.link,
      row.description,
      (row.rules || '').split(','),
      row.banned,
      row.whatsLink,
      row.createdAt,
      cat ? Category.fromDb(cat) : undefined,
      pr,
    );
  }
}
export type GroupReq = NewGroupDb;
export type GroupPatchReq = {
  name?: string;
  userCount?: number;
  imageUrl?: string;
  link?: string;
  description?: string;
  verified?: boolean;
  banned?: boolean;
  whatsLink?: string;
};
