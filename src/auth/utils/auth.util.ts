import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { hash } from 'crypto';
import { Token } from '../entities/token.model';
import { User } from '../entities/user.model';
@Injectable()
export class AuthUtil {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid Credentials');

    if (hash('sha512', password) != user.password)
      throw new UnauthorizedException('Invalid Credentials');

    return new Token(this.authService.createToken(user));
  }

  async register(
    email: string,
    password: string,
    username: string,
    phone: string,
  ): Promise<User> {
    const user = await this.userService.getUserByEmail(email);

    if (user) throw new BadRequestException('Email already taken');

    const newUser = await this.userService.register(
      email,
      hash('sha512', password),
      username,
      phone,
    );
    if (!newUser) throw new BadRequestException('Bad Request');
    return newUser;
  }
  refreshToken(token: string): Token {
    return new Token(this.authService.renovateToken(token));
  }
}
