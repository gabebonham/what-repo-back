import { hash, randomUUID, UUID } from 'crypto';
import { Role, User, UserPatchReq } from '../entities/user.model';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { log } from 'console';
import { users } from 'src/db/schemas/user.entity';
import { eq } from 'drizzle-orm';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
@Injectable()
export class UserService {
  constructor(@Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase) {}
  async getUserById(id: string): Promise<User | null> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    if (!user) return null;
    return User.fromDb(user);
  }
  async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (!user) return null;
    return User.fromDb(user);
  }
  async register(
    email: string,
    password: string,
    username: string,
    phone: string,
  ): Promise<User | null> {
    const [newUser] = await this.db
      .insert(users)
      .values({ email, password, username, phone, roles: 'user' })
      .returning();

    if (!newUser) return null;

    return User.fromDb(newUser);
  }
  async update(id: string, user: UserPatchReq): Promise<User | null> {
    const obj = {
      username: user.username,
      password: user.password,
      email: user.email,
      phone: user.phone,
      roles: user.roles?.join(',').trim(),
    };
    const [newUser] = await this.db
      .update(users)
      .set(obj)
      .where(eq(users.id, id))
      .returning();

    if (!newUser) return null;

    return User.fromDb(newUser);
  }
}
