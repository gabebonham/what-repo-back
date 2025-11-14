import { UUID } from 'crypto';
import { User } from 'src/auth/entities/user.model';
import { NewCategoryDb } from 'src/db/schemas/category.entity';
import { NewGroupDb } from 'src/drizzle/schema';

export class Category {
  id: UUID;
  name: string;
  icon: string;
  description: string;
  link: string;
  groupCount: number;
  imageUrl: string;
  createdAt: Date;
  constructor(
    id: UUID,
    name: string,
    icon: string,
    description: string,
    link: string,
    groupCount: number,
    imageUrl: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.description = description;
    this.link = link;
    this.groupCount = groupCount;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
  }
  static fromDb(row: any): Category {
    return new Category(
      row.id,
      row.name,
      row.icon,
      row.description,
      row.link,
      row.group_count ?? row.groupCount,
      row.image_url ?? row.imageUrl,
      row.created_at ?? row.createdAt,
    );
  }
}
export type CategoryReq = NewCategoryDb;
export type CategoryPatchReq = {
  name?: string;
  icon?: string;
  description?: string;
  link?: string;
  groupCount?: number;
  imageUrl?: string;
};
