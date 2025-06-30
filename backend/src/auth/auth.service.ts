import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import jwtRefreshConfigConfiguration from 'src/config/jwt-refresh.config';
import type { JwtPayload, LoginResponse } from '@alarm-monitoring/schemas/auth'; // Adjust the import path as necessary
import { ConfigType } from '@nestjs/config';
import { hash } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(jwtRefreshConfigConfiguration.KEY)
    private jwtRefreshConfig: ConfigType<typeof jwtRefreshConfigConfiguration>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    return { id: user.id, role: user.role };
  }

  async login(userId: number, role: string): Promise<LoginResponse> {
    const { accessToken, refreshToken } = await this.generateTokens(
      userId,
      role,
    );

    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);

    return {
      accessToken,
      refreshToken,
      type: 'Bearer',
    };
  }

  async generateTokens(userId: number, role: string) {
    const payload: JwtPayload = { sub: { id: userId, role } };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.jwtRefreshConfig),
    ]);
    return { accessToken, refreshToken };
  }

  refreshToken(userId: number, role: string): LoginResponse {
    const payload: JwtPayload = { sub: { id: userId, role } };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.jwtRefreshConfig);
    return {
      accessToken: token,
      refreshToken: refreshToken,
      type: 'Bearer',
    };
  }

  async logout(userId: number): Promise<void> {
    await this.userService.logout(userId);
  }
}
