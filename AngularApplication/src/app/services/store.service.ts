import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Algo } from '../store/models/algo.interface';
import { AuthRequestService } from './auth-request.service';
import { Observable } from 'rxjs/Observable';
import { AlgoLog } from '../store/models/algo-log.interface';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class StoreService {

  _algos = new BehaviorSubject<Array<Algo>>([]);
  algosStore: Array<any>;

  public algos = this._algos.asObservable();

  public activeAlgo: Algo;
  public mode: string;

  constructor(private authRequestService: AuthRequestService) {

    this.algosStore = [];
  }

  getAllPublicAlgos(): Observable<Algo[]> {
    return this.authRequestService.get('/v1/clientData/getAllAlgos');
  }

  algoGetAll(): Observable<Algo[]> {
    return this.authRequestService.get('/v1/clientData/metadata');
  }

  algoCreateDetails(algo: Algo): Observable<Algo> {
    return this.authRequestService.post('/v1/clientData/metadata', algo);
  }

  getAlgoById(algoId: string): Observable<Algo> {
    return forkJoin(
      this.authRequestService.get(`/v1/clientData/algoMetadata?algoId=${algoId}`),
      this.algoGet(algoId)
    ).map( res => ({...res[0], ...res[1]}) );
  }

  algoGet(algoId: string): Observable<Algo> {
    return this.authRequestService.get(`/v1/clientData/imageData/upload/string?AlgoId=${algoId}`);
  }

  algoSave(algoId: string, data: string): Observable<Algo> {
    return this.authRequestService.post(`/v1/clientData/imageData/upload/string`, { AlgoId: algoId, Data: data });
  }

  algoUpload(formData: FormData): Observable<Algo> {
    return this.authRequestService.post('/v1/clientData/imageData/upload/binary', formData);
  }

  algoDeploy(algoId: string): Observable<Algo> {
    return this.authRequestService.post('/v1/management/deploy/binary', { AlgoId: algoId });
  }

  algoStart(algoId: string): Observable<Algo> {
    return this.authRequestService.post('/v1/management/test/start', { AlgoId: algoId });
  }

  algoStop(algoId: string): Observable<Algo> {
    return this.authRequestService.post('/v1/management/test/stop', { AlgoId: algoId });
  }

  algoDelete(algo: Algo): Observable<Algo> {
    return this.authRequestService.post('/v1/clientData/metadata/cascadeDelete', algo);
  }

  algoGetLog(algoId: string): Observable<Algo> {
    return this.authRequestService.get(`/v1/management/test/log?AlgoId=${algoId}`);
  }

  algoGetTailLog(algoId: string, tail: number): Observable<AlgoLog> {
    return this.authRequestService.get(`/v1/management/test/tailLog?AlgoId=${algoId}&Tail=${tail}`);
  }
}
