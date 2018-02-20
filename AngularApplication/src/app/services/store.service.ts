import { Injectable } from '@angular/core';
import { Algo } from '../store/models/algo.interface';
import { AuthRequestService } from './auth-request.service';
import { Observable } from 'rxjs/Observable';
import { AlgoLog } from '../store/models/algo-log.interface';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { environment } from '../../environments/environment';
import { AlgoInstance } from '../store/models/algo-instance.model';

@Injectable()
export class StoreService {

  constructor(private authRequestService: AuthRequestService) {  }

  getAllPublicAlgos(): Observable<Algo[]> {
    return this.authRequestService.get(environment.storeApiUrl + '/v1/clientData/getAllAlgos');
  }

  algoGetAll(): Observable<Algo[]> {
    return this.authRequestService.get(environment.storeApiUrl + '/v1/clientData/metadata');
  }

  algoCreateDetails(algo: Algo): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/clientData/metadata', algo);
  }

  algoGetMetadata(algoId: string, clientId?: string): Observable<Algo> {
    const params = { algoId };

    if (clientId) {
      params['clientId'] = clientId;
    }

    return this.authRequestService.get(environment.storeApiUrl + '/v1/clientData/algoMetadata', { params });
  }

  getAlgoWithSource(algoId: string, clientId?: string, ): Observable<Algo> {
    const params = { algoId };

    if (clientId) {
      params['clientId'] = clientId;
    }

    return forkJoin(
      this.authRequestService.get(environment.storeApiUrl + '/v1/clientData/algoMetadata', { params }),
      this.algoGetSource(algoId, clientId)
    ).map( res => ({...res[0], ...res[1]}) );
  }

  algoGetSource(algoId: string, clientId?: string): Observable<Algo> {
    const params = { algoId };

    if (clientId) {
      params['clientId'] = clientId;
    }
    return this.authRequestService.get(environment.storeApiUrl + '/v1/clientData/imageData/upload/string', { params });
  }

  algoSave(algoId: string, data: string): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + `/v1/clientData/imageData/upload/string`, { AlgoId: algoId, Data: data });
  }

  algoUpload(formData: FormData): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/clientData/imageData/upload/binary', formData);
  }

  algoDeploy(algoId: string): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/management/deploy/binary', { AlgoId: algoId });
  }

  algoStart(algoId: string): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/management/test/start', { AlgoId: algoId });
  }

  algoStop(algoId: string): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/management/test/stop', { AlgoId: algoId });
  }

  algoDelete(algo: Algo): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/clientData/metadata/cascadeDelete', algo);
  }

  algoGetLog(algoId: string): Observable<Algo> {
    return this.authRequestService.get(environment.storeApiUrl + `/v1/management/test/log?AlgoId=${algoId}`);
  }

  algoGetTailLog(algoId: string, tail: number): Observable<AlgoLog> {
    return this.authRequestService.get(environment.storeApiUrl + `/v1/management/test/tailLog?AlgoId=${algoId}&Tail=${tail}`);
  }

  createLiveAlgoIntance(data: AlgoInstance): Observable<AlgoInstance> {
    return this.authRequestService.post(environment.storeApiUrl + '', {data: data}); // TODO add real endpoint
  }

  createDemoAlgoIntance(data: AlgoInstance): Observable<AlgoInstance> {
    return this.authRequestService.post(environment.storeApiUrl + '', {data: data}); // TODO add real endpoint
  }

  getAlgoInstances(algoId: string): Observable<AlgoInstance> {
    return this.authRequestService.get(environment.storeApiUrl + ''); // TODO add real endpoint
  }

  deleteAlgoInstance(instanceId: string): Observable<AlgoInstance> {
    return this.authRequestService.get(environment.storeApiUrl + ''); // TODO add real endpoint
  }
}
