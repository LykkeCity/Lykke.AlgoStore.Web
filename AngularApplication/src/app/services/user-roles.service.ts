import { Injectable } from '@angular/core';
import { AuthRequestService } from './auth-request.service';
import { Observable } from 'rxjs/Observable';
import { UserData } from '../models/userdata.interface';
import { environment } from '../../environments/environment';
import { UserRole } from '../models/user-role.model';

@Injectable()
export class UserRolesService {

  constructor(private authRequestService: AuthRequestService) {

  }

  getAllUsersWithRoles(): Observable<UserData[]> {
    return this.authRequestService.get(environment.storeApiUrl + '/v1/users/getAllWithRoles');
  }

  getAllRoles(): Observable<UserRole[]> {
    return this.authRequestService.get(environment.storeApiUrl + '/v1/roles/getAll');
  }

  getRolesForUser(clientId: string): Observable<UserRole[]> {
    const params = { clientId };
    return this.authRequestService.get(environment.storeApiUrl + '/v1/roles/getByClientId', { params });
  }

  revokeRole(clientId: string, roleId: string): Observable<UserRole> {
    const body = { clientId, roleId };
    return this.authRequestService.post(environment.storeApiUrl + '/v1/roles/revokeRole', body);
  }

  assignRole(clientId: string, roleId: string): Observable<UserRole> {
    const body = { clientId, roleId };
    return this.authRequestService.post(environment.storeApiUrl + '/v1/roles/assignRole', body);
  }
}
