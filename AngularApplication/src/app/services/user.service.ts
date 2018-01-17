import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NotificationsService } from 'angular2-notifications';
import { UserData } from '../models/userdata.interface';

@Injectable()
export class UserService extends CrudService {

  _userData = new BehaviorSubject<UserData>(null);
  dataStore: UserData;

  public userData = this._userData.asObservable();

  constructor(http: HttpClient, notificationService: NotificationsService) {
    super(http, notificationService);
    // this.getUserInfo();
  }

  getUserInfo() {
    this.get('/PersonalData ').subscribe(data => {
      this.dataStore = data;
      this._userData.next({...this.dataStore});
    }, error => console.log('Could not load user data.'));
  }
}
