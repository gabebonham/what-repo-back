import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import {
  JsonWebTokenError,
  JwtPayload,
  sign,
  TokenExpiredError,
  verify,
} from 'jsonwebtoken';
import * as schema from 'src/drizzle/schema';
import { User } from 'src/auth/entities/user.model';
import { UserService } from 'src/auth/services/user.service';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { users } from 'src/drizzle/schema';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: PostgresJsDatabase<typeof schema>,
    private readonly userService: UserService,
  ) {}
  extractTokenFromHeader(authHeader: string): string {
    if (!authHeader)
      throw new UnauthorizedException('Missing Authorization header');

    const res = authHeader.split(' ');

    if (res[0] != 'Bearer')
      throw new UnauthorizedException('Authorization header malformed');
    if (!res[1])
      throw new UnauthorizedException('Authorization header malformed');

    return res[1];
  }
  validateToken(token: string): JwtPayload {
    const secret = process.env.JWT_SECRET as string;
    try {
      const payload = verify(token, secret) as JwtPayload;

      if (!payload.sub) throw new UnauthorizedException('Invalid token');

      const user = this.userService.getUserById(payload.sub);

      if (!user) throw new BadRequestException('User Not Found');

      return payload;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      } else if (err instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      } else if (err instanceof BadRequestException) {
        throw new UnauthorizedException('User Not Found');
      } else {
        throw new UnauthorizedException('Authentication failed');
      }
    }
  }
  getExp(addHours: number): number {
    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * addHours;
    return exp;
  }
  createToken(user: User): string {
    const secret = process.env.JWT_SECRET as string;
    return sign({ roles: user.roles }, secret, {
      subject: user.id.toString(),
      expiresIn: this.getExp(12),
    });
  }
  renovateToken(token: string) {
    const secret = process.env.JWT_SECRET as string;
    const payload = this.validateToken(token);
    payload.exp = this.getExp(12);
    return sign(payload, secret);
  }
}
