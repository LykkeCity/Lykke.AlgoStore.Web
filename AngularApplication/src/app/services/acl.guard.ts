import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class ACLGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private userService: UserService, private notificationsService: NotificationsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const hasAccess = this.hasAccess(route.data['acl']);

    if (!hasAccess) {
      this.router.navigate(['/404']).then(() => {
        this.notificationsService.error('Forbidden', 'You do not have permission to perform this action.');
      });
    }

    return hasAccess;
  }


  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const hasAccess = this.hasAccess(route.data['acl']);

    if (!hasAccess) {
      this.router.navigate(['/404']).then(() => {
        this.notificationsService.error('Forbidden', 'You do not have permission to perform this action.');
      });
    }

    return hasAccess;
  }

  private hasAccess(requiredPermissions: string[]): boolean {
    const userRoles = this.userService.getLoggedUser().Roles;
    const userPermissions = userRoles.map(role => role.Permissions).reduce((acc, val) => acc.concat(val), []);

    const matchedPermissions = [];

    if (requiredPermissions.length === 1) {
      if (userPermissions.some(perm => perm.Id === requiredPermissions[0])) {
        return true;
      }
    } else {
      for (const requiredPermission of requiredPermissions) {
        if (userPermissions.some(perm => perm.Id === requiredPermission)) {
          matchedPermissions.push(requiredPermission);
        }
      }

      if (matchedPermissions.length === requiredPermissions.length) {
        return true;
      }
    }


    return false;
  }
}
