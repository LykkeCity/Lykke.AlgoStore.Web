import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserData } from '../models/userdata.interface';
import { AuthRequestService } from './auth-request.service';

@Injectable()
export class UserService {

  _userData = new BehaviorSubject<UserData>(null);
  dataStore: UserData;

  public userData = this._userData.asObservable();

  constructor(private authRequestService: AuthRequestService) {
  }

  getUserInfo(): void {
    this.authRequestService.get<UserData>('/PersonalData ').subscribe(data => {
      this.dataStore = data;
      this._userData.next({...this.dataStore});
    }, error => console.log('Could not load user data.'));
  }
}
