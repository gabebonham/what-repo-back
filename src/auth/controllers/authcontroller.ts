import { Body, Controller, Get, Header, Headers, Post } from '@nestjs/common';
import { Token } from '../entities/token.model';
import { User } from '../entities/user.model';
import { LoginDto } from '../entities/DTOs/login.dto';
import { RegisterDto } from '../entities/DTOs/register.dto';
import { AuthUtil } from '../utils/auth.util';
import { ProfileService } from '../services/profile.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUtil: AuthUtil,
    private readonly profileService: ProfileService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<Token> {
    const token = await this.authUtil.login(body.email, body.password);
    return token;
  }
  @Post('register')
  async register(@Body() body: RegisterDto): Promise<User> {
    const user = await this.authUtil.register(
      body.email,
      body.password,
      body.username,
      body.phone,
    );
    await this.profileService.createProfile({
      userId: user.id,
      email: body.email,
      name: body.username,
      phone: body.phone,
    });
    return user;
  }
  @Post('refresh-token')
  async refreshToken(@Headers('authorization') header: string): Promise<Token> {
    const newToken = this.authUtil.refreshToken(header);
    return newToken;
  }
}
