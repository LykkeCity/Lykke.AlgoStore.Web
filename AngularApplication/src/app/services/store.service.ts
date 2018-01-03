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

  algoGet(algoId) {
    return this.get(`/v1/clientData/imageData/upload/string?AlgoId=${algoId}`);
  }

  algoSave(algoId, data) {
    return this.post(`/v1/clientData/imageData/upload/string?AlgoId=${algoId}&Data=${data}`, null);
  }

  algoUpload(formData: FormData) {
    return this.post('/v1/clientData/imageData/upload/binary', formData);
  }

  algoDeploy(data: any) {
    return this.post('/v1/management/deploy/binary', { AlgoId: data.Id });
  }

  algoStart(algoId) {
    return this.post('/v1/management/test/start', { AlgoId: algoId });
  }

  algoStop(algoId) {
    return this.post('/v1/management/test/stop', { AlgoId: algoId });
  }

  algoDelete(algo: Algo) {
    return this.post('/v1/clientData/metadata/cascadeDelete', algo);
  }

  algoGetLog(algoId) {
    return this.get(`/v1/management/test/log?AlgoId=${algoId}`);
  }

  algoGetTailLog(algoId, tail) {
    return this.get(`/v1/management/test/tailLog?AlgoId=${algoId}&Tail=${tail}`);
  }
}
