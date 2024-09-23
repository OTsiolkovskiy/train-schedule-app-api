import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CookieService } from 'src/auth/cookie.service';
import { Request } from 'express';
import { jwtSecret } from '../constans';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as Request;

    const token = req.cookies[CookieService.tokenKey];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const sessionInfo = this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });

      req['session'] = sessionInfo;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
