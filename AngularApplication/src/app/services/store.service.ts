import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { Algo } from '../models/algo.interface';
import { EventService } from './event.service';

@Injectable()
export class StoreService extends CrudService {

  _algos = new BehaviorSubject<Array<Algo>>([]);
  algosStore: Array<any>;

  public algos = this._algos.asObservable();

  public activeAlgo: Algo;
  public mode: string;

  constructor(
    http: HttpClient,
    notificationService: NotificationsService,
    private eventService: EventService) {
    super(http, notificationService);

    this.algosStore = [];
  }

  algoGetAll() {
    return this.get('/v1/clientData/metadata');
  }

  algoCreateDetails(algo: Algo) {
    return this.post('/v1/clientData/metadata', algo);
  }
}
