import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { UserData } from '../models/userdata.interface';
import { AuthRequestService } from './auth-request.service';

@Injectable()
export class UserService {

  userInfo = new BehaviorSubject<UserData | null>(null);

  constructor(private authRequestService: AuthRequestService) {  }

  getUserInfo(): Observable<UserData> {
    return this.authRequestService.get('devapi/PersonalData').pipe(
      map(res => res['Result'])
    ).pipe(tap(res => {
      this.userInfo.next(res);
    }));
  }

}
