import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, PERMISSIONS_KEY } from '../decorators/index';

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

    // Không yêu cầu gì → cho qua (user đã login là đủ)
    if (!requiredRoles?.length && !requiredPermissions?.length) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user?.role) {
      throw new ForbiddenException('Bạn không có quyền truy cập');
    }

    const userRoleName: string = user.role.name;
    const userPermissions: string[] =
      user.role.permissions?.map((p: { name: string }) => p.name) ?? [];

    // ── Check ROLE ──────────────────────────────────────────
    if (requiredRoles?.length) {
      const hasRole = requiredRoles.includes(userRoleName);
      if (!hasRole) {
        throw new ForbiddenException(
          `Yêu cầu role: ${requiredRoles.join(', ')}`,
        );
      }
    }

    // ── Check PERMISSION ────────────────────────────────────
    if (requiredPermissions?.length) {
      // admin luôn có tất cả quyền
      if (userRoleName === 'admin') return true;

      const hasPermission = requiredPermissions.some((p) =>
        userPermissions.includes(p),
      );

      if (!hasPermission) {
        throw new ForbiddenException(
          `Yêu cầu quyền: ${requiredPermissions.join(', ')}`,
        );
      }
    }

    return true;
  }
}
