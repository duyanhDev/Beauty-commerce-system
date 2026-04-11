import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, PERMISSIONS_KEY } from '../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles?.length && !requiredPermissions?.length) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('Chưa đăng nhập');
    }

    const userRole = user.role;
    const userPermissions = new Set(user.permissions || []);

    // ── ROLE ──
    if (requiredRoles?.length) {
      if (!requiredRoles.includes(userRole)) {
        throw new ForbiddenException(
          `Yêu cầu role: ${requiredRoles.join(', ')}`,
        );
      }
    }

    // ── PERMISSION ──
    if (requiredPermissions?.length) {
      if (userRole === 'admin') return true;

      const hasPermission = requiredPermissions.every((p) =>
        userPermissions.has(p),
      );

      if (!hasPermission) {
        throw new ForbiddenException(
          `Thiếu quyền: ${requiredPermissions.join(', ')}`,
        );
      }
    }

    return true;
  }
}
