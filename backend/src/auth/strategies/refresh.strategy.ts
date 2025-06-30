import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtRefreshConfiguration from '../../config/jwt-refresh.config';
import { JwtPayload } from '@alarm-monitoring/schemas/auth';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(jwtRefreshConfiguration.KEY)
    private jwtRefreshConfig: ConfigType<typeof jwtRefreshConfiguration>,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      secretOrKey: jwtRefreshConfig.secret as string,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    // Here we have the decoded payload from the JWT token
    const refreshToken: string = (req.body?.token as string) || '';
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }
    if (!payload?.sub.id) {
      throw new UnauthorizedException(
        'Invalid JWT token: missing subject (sub) field',
      );
    }
    if (
      !(await this.userService.validateRefreshToken(
        payload.sub.id,
        refreshToken,
      ))
    ) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return { id: payload.sub };
  }
}
