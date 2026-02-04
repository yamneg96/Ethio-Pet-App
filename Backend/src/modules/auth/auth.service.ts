import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, UserRole } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { TokenService } from './token.service';
import { compareHash, hashValue } from '../../common/utils/crypto.util';
import { RedisService } from '../../common/utils/redis.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already in use');

    const passwordHash = await hashValue(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        role: dto.role,
        phone: dto.phone,
        sellerProfile: dto.role === UserRole.SELLER ? { create: { displayName: dto.email.split('@')[0] } } : undefined,
      },
      select: { id: true, email: true, role: true },
    });

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || user.isDeleted) throw new UnauthorizedException('Invalid credentials');

    const valid = await compareHash(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const { token: accessToken, jti } = await this.tokenService.signAccessToken(user.id, user.role);
    const refreshToken = await this.tokenService.signRefreshToken(user.id, user.role);
    const refreshTokenHash = await hashValue(refreshToken);

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(Date.now() + this.parseTtlToMs(process.env.JWT_REFRESH_TTL || '7d')),
      },
    });

    return { accessToken, refreshToken, jti };
  }

  async refresh(dto: RefreshDto) {
    let payload: { sub: string; role: string };
    try {
      payload = await this.jwtService.verifyAsync(dto.refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.prisma.refreshToken.findMany({
      where: { userId: payload.sub, revokedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const matches = await Promise.all(tokens.map(async (t) => compareHash(dto.refreshToken, t.tokenHash)));
    if (!matches.includes(true)) throw new UnauthorizedException('Invalid refresh token');

    await this.prisma.refreshToken.updateMany({
      where: { userId: payload.sub, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    const { token: accessToken } = await this.tokenService.signAccessToken(payload.sub, payload.role);
    const refreshToken = await this.tokenService.signRefreshToken(payload.sub, payload.role);
    const refreshTokenHash = await hashValue(refreshToken);

    await this.prisma.refreshToken.create({
      data: {
        userId: payload.sub,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(Date.now() + this.parseTtlToMs(process.env.JWT_REFRESH_TTL || '7d')),
      },
    });

    return { accessToken, refreshToken };
  }

  async logout(userId: string, jti: string) {
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    const redis = await this.redisService.getClient();
    const ttlSeconds = 60 * 60 * 24;
    await redis.set(`jwt:blacklist:${jti}`, '1', 'EX', ttlSeconds);

    return { success: true };
  }

  private parseTtlToMs(ttl: string): number {
    if (ttl.endsWith('m')) return Number(ttl.replace('m', '')) * 60 * 1000;
    if (ttl.endsWith('h')) return Number(ttl.replace('h', '')) * 60 * 60 * 1000;
    if (ttl.endsWith('d')) return Number(ttl.replace('d', '')) * 24 * 60 * 60 * 1000;
    return Number(ttl) * 1000;
  }
}
