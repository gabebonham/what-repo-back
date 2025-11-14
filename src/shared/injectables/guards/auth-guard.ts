import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../../auth/services/auth.service';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader =
      request.headers['authorization'] || request.headers['Authorization'];

    if (!authHeader) throw new UnauthorizedException('Missing token');

    const token = this.authService.extractTokenFromHeader(authHeader);
    let payload = this.authService.validateToken(token) as JwtPayload;
    return !!payload;
  }
}
