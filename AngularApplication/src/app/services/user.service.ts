import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Wallet } from '../models/wallet.model';
import { UserData } from '../models/userdata.interface';
import { environment } from '../../environments/environment';
import { AuthRequestService } from './auth-request.service';
import { UserRole } from '../models/user-role.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  public loggedUserSubject: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(null);
  public userRoles: BehaviorSubject<UserRole[]> = new BehaviorSubject<UserRole[]>(null);

  constructor(private authRequestService: AuthRequestService) {
  }

  updatePermissions(roles: UserRole[]) {
    const userPermissions = roles.map(role => role.Permissions).reduce((acc, val) => acc.concat(val), []);
    this.userRoles.next(userPermissions);
  }

  public hasPermission(permissionId: string): boolean {
    return this.userRoles.getValue() ? this.userRoles.getValue().some(p => p.Id === permissionId) : false;
  }

  public setLoggedUser(userData: UserData) {
    this.updatePermissions(userData.Roles);

    this.loggedUserSubject.next(userData);
  }

  public getLoggedUser(): UserData {
    return this.loggedUserSubject.getValue();
  }

  getUserInfo(): Observable<UserData> {
    return this.authRequestService.get(environment.apiUrl + '/PersonalData').pipe(
      map(res => res['Result'])
    );
  }

  getUserRoles(clientId?: string): Observable<UserRole[]> {
    const params = {};
    if (clientId) {
      params['clientId'] = clientId;
    }
    return this.authRequestService.get(environment.storeApiUrl + '/v1/roles/getByClientId', { params });
  }

  getUserInfoWithRoles(clientId?: string): Observable<UserData> {
    const params = {};
    if (clientId) {
      params['clientId'] = clientId;
    }
    return this.authRequestService.get(environment.storeApiUrl + '/v1/users/getByIdWithRoles', { params });
  }

  getUserWalletsWithBalances(): Observable<Wallet[]> {
    return this.authRequestService.get<Wallet[]>(environment.apiV2Url + 'wallets/balances');
  }
}
