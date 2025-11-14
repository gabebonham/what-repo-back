import { UUID } from 'crypto';
import { User } from 'src/auth/entities/user.model';
import { Category } from 'src/category/models/category.model';
import { NewCategoryDb } from 'src/db/schemas/category.entity';
import { NewGroupDb } from 'src/drizzle/schema';

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
  author?: User | null;
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
  }
  static fromDb(row: any): Group {
    return new Group(
      row.id,
      row.name,
      row.category_id ?? row.categoryId,
      row.user_count ?? row.userCount,
      row.image_url ?? row.imageUrl,
      row.link,
      row.description,
      (row.rules || '')
        .split(',')
        .map((r: string) => r.trim())
        .filter(Boolean),
      row.banned,
      row.whats_link ?? row.whatsLink,
      row.created_at ?? row.createdAt,
      row.categories,
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
