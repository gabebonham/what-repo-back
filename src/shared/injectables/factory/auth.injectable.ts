import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthReq = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader =
      request.headers['Authorization'] ?? request.headers['authorization'];
  },
);
