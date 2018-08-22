import { Injectable } from '@angular/core';
import { AuthRequestService } from './auth-request.service';
import { Observable } from 'rxjs';
import { UserPermission } from '../../models/user-permission.model';
import { environment } from '../../../environments/environment';
import { RolePermissionMatch } from '../../models/role-permission-match.model';

@Injectable()
export class UserPermissionService {

  constructor(private authRequestService: AuthRequestService) {

  }

  getAllPermissions(): Observable<UserPermission[]> {
    return this.authRequestService.get(environment.storeApiUrl + '/v1/permissions/getAll');
  }

  getPermissionsForRole(roleId: string): Observable<UserPermission[]> {
    const params = { roleId };
    return this.authRequestService.get(environment.storeApiUrl + '/v1/permissions/getByRoleId', { params });
  }

  assignPermissions(matches: RolePermissionMatch[]): Observable<UserPermission> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/permissions/assignPermissions', matches);
  }

  revokePermissions(matches: RolePermissionMatch[]): Observable<UserPermission> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/permissions/revokePermissions', matches);
  }

}
