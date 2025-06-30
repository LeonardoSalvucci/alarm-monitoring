import { UserRole } from '@alarm-monitoring/schemas/user';
import { JwtPayload } from '@alarm-monitoring/schemas/auth';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const user = context
      .switchToHttp()
      .getRequest<{ user: JwtPayload['sub'] }>().user;
    return requiredRoles.some((role) => user?.role === role);
  }
}
