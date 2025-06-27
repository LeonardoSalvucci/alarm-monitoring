import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtRefreshConfiguration from '../../config/jwt-refresh.config';
import { JwtPayload } from '@alarm-monitoring/schemas/auth';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(jwtRefreshConfiguration.KEY)
    private jwtRefreshConfig: ConfigType<typeof jwtRefreshConfiguration>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      secretOrKey: jwtRefreshConfig.secret as string,
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload) {
    // Here we have the decoded payload from the JWT token
    if (!payload?.sub) {
      throw new UnauthorizedException(
        'Invalid JWT token: missing subject (sub) field',
      );
    }
    return { id: payload.sub };
  }
}
