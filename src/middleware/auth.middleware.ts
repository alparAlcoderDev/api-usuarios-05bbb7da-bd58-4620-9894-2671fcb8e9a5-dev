import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      req['user'] = verify(token, process.env.SECRET);
      next();
    } catch(e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}