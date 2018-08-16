import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class ACLGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService, private notificationsService: NotificationsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const hasAccess = this.hasAccess(route.data['acl']);

    if (hasAccess.legal && !hasAccess.permissions) {
      this.router.navigate(['/404']).then(() => {
        this.notificationsService.error('Forbidden', 'You do not have permission to perform this action.');
      });
      return false;
    }

    if (!hasAccess.legal) {
      return true;
    }

    return hasAccess.permissions;
  }

  private hasAccess(requiredPermissions: string[]): {legal: boolean, permissions: boolean} {
    const user = this.userService.getLoggedUser();
    const userRoles = user.Roles;
    const access = {legal: false, permissions: false};

    if (!userRoles) {
      return access;
    }

    if (user.Legal && user.Legal.GDPRConsent) {
      access.legal = true;
    }

    const userPermissions = userRoles.map(role => role.Permissions).reduce((acc, val) => acc.concat(val), []);

    const matchedPermissions = [];

    if (requiredPermissions.length === 1) {
      if (userPermissions.some(perm => perm.Id === requiredPermissions[0])) {
        access.permissions = true;
      }
    } else {
      for (const requiredPermission of requiredPermissions) {
        if (userPermissions.some(perm => perm.Id === requiredPermission)) {
          matchedPermissions.push(requiredPermission);
        }
      }

      if (matchedPermissions.length === requiredPermissions.length) {
        access.permissions = true;
      }
    }

    return access;
  }
}
