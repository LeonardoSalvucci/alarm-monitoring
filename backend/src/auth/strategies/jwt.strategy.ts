import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfiguration from '../../config/jwt.config';
import { JwtPayload } from '@alarm-monitoring/schemas/auth';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfiguration.KEY)
    private jwtConfig: ConfigType<typeof jwtConfiguration>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret as string,
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
