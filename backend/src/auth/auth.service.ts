import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import jwtRefreshConfigConfiguration from 'src/config/jwt-refresh.config';
import type { JwtPayload, LoginResponse } from '@alarm-monitoring/schemas/auth'; // Adjust the import path as necessary
import { ConfigType } from '@nestjs/config';

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
    return { id: user.id };
  }

  login(userId: number): LoginResponse {
    const payload: JwtPayload = { sub: userId };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.jwtRefreshConfig);
    return {
      accessToken: token,
      refreshToken: refreshToken,
      type: 'Bearer',
    };
  }

  refreshToken(userId: number): LoginResponse {
    const payload: JwtPayload = { sub: userId };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.jwtRefreshConfig);
    return {
      accessToken: token,
      refreshToken: refreshToken,
      type: 'Bearer',
    };
  }
}
