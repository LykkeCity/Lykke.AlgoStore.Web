import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Algo } from '../models/algo.interface';
import { AuthRequestService } from './auth-request.service';

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

  algoGetAll() {
    return this.authRequestService.get('/v1/clientData/metadata');
  }

  algoCreateDetails(algo: Algo) {
    return this.authRequestService.post('/v1/clientData/metadata', algo);
  }

  algoGet(algoId) {
    return this.authRequestService.get(`/v1/clientData/imageData/upload/string?AlgoId=${algoId}`);
  }

  algoSave(algoId, data) {
    return this.authRequestService.post(`/v1/clientData/imageData/upload/string?AlgoId=${algoId}&Data=${data}`, null);
  }

  algoUpload(formData: FormData) {
    return this.authRequestService.post('/v1/clientData/imageData/upload/binary', formData);
  }

  algoDeploy(data: any) {
    return this.authRequestService.post('/v1/management/deploy/binary', { AlgoId: data.Id });
  }

  algoStart(algoId) {
    return this.authRequestService.post('/v1/management/test/start', { AlgoId: algoId });
  }

  algoStop(algoId) {
    return this.authRequestService.post('/v1/management/test/stop', { AlgoId: algoId });
  }

  algoDelete(algo: Algo) {
    return this.authRequestService.post('/v1/clientData/metadata/cascadeDelete', algo);
  }

  algoGetLog(algoId) {
    return this.authRequestService.get(`/v1/management/test/log?AlgoId=${algoId}`);
  }

  algoGetTailLog(algoId, tail) {
    return this.authRequestService.get(`/v1/management/test/tailLog?AlgoId=${algoId}&Tail=${tail}`);
  }
}
