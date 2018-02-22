import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { UserData } from '../models/userdata.interface';
import { AuthRequestService } from './auth-request.service';

@Injectable()
export class UserService {

  constructor(private authRequestService: AuthRequestService) {  }

  getUserInfo(): Observable<UserData> {
    return this.authRequestService.get('devapi/PersonalData').pipe(
      map(res => res['Result'])
    );
  }

}
