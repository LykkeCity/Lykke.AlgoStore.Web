import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { Issuers } from '../models/issuers.interface';

@Injectable()
export class IssuersService extends CrudService {

  _issuers = new BehaviorSubject<Array<Issuers>>([]);
  dataStore: Array<Issuers>;

  public issuers = this._issuers.asObservable();


  constructor(http: HttpClient, notificationService: NotificationsService) {
    super(http, notificationService);
    this.getAllIssuers();
  }

  getAllIssuers() {
    this.get('/Issuers').subscribe(data => {
      this.dataStore = data;
      this._issuers.next([...this.dataStore]);
    }, error => console.log('Could not load issuers'));
  }
}
