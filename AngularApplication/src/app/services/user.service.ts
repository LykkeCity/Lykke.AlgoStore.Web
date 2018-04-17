import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Wallet } from '../models/wallet.model';
import { UserData } from '../models/userdata.interface';
import { environment } from '../../environments/environment';
import { AuthRequestService } from './auth-request.service';
import { UserRole } from '../models/user-role.model';

@Injectable()
export class UserService {

  constructor(private authRequestService: AuthRequestService) {  }

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

  getUserInfoWithRoles(clientId: string): Observable<UserData> {
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
