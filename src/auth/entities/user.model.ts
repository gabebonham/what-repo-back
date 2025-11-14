import { UUID } from 'crypto';
export class Role {
  id: UUID;
  name: string;
  createdAt: Date;
  constructor(id: UUID, name: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
  }
}

export class User {
  id: UUID;
  username: string;
  password: string;
  email: string;
  roles: Role[];
  phone: string;
  createdAt: Date;
  constructor(
    id: UUID,
    username: string,
    password: string,
    email: string,
    roles: Role[],
    phone: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.roles = roles;
    this.phone = phone;
    this.createdAt = createdAt;
  }
  static fromDb(row: any): User {
    return new User(
      row.id,
      row.username,
      row.password,
      row.email,
      row.roles.split(','),
      row.phone,
      row.created_at ?? row.createdAt,
    );
  }
}
export type UserPatchReq = {
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  roles?: string[];
};
