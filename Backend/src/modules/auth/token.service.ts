import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload } from './auth.types';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async signAccessToken(userId: string, role: string): Promise<{ token: string; jti: string }> {
    const jti = uuidv4();
    const payload: JwtPayload = { sub: userId, role, jti };
    const token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: process.env.JWT_ACCESS_TTL });
    return { token, jti };
  }

  async signRefreshToken(userId: string, role: string): Promise<string> {
    const payload: JwtPayload = { sub: userId, role, jti: uuidv4() };
    return this.jwtService.signAsync(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.JWT_REFRESH_TTL });
  }
}
