import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Algo } from '../store/models/algo.interface';
import { AuthRequestService } from './auth-request.service';
import { AlgoInstance } from '../store/models/algo-instance.model';
import { AlgoLog } from '../store/models/algo-log.interface';

@Injectable()
export class InstanceService {

  constructor(private authRequestService: AuthRequestService) { }

  algoDeploy(algoClientId: string, algoId: string, instanceId: string): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/management/deploy/binary', { algoClientId, algoId, instanceId });
  }

  algoStart(algoId: string): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/management/test/start', { AlgoId: algoId });
  }

  algoStop(algoId: string, instanceId: string, algoClientId: string): Observable<Algo> {
    return this.authRequestService.post(
      environment.storeApiUrl + '/v1/management/test/stop', { AlgoId: algoId, InstanceId: instanceId, AlgoClientId: algoClientId }
    );
  }

  algoDelete(algo: Algo): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/clientData/metadata/cascadeDelete', algo);
  }
  algoGetTailLog(AlgoId: string, InstanceId: string, AlgoClientId: string, Tail: number = 100): Observable<AlgoLog> {
    const params = { AlgoId, InstanceId, AlgoClientId, Tail };
    return this.authRequestService.get(environment.storeApiUrl + `/v1/management/test/tailLog`, { params });
  }

  createLiveAlgoIntance(data): Observable<AlgoInstance> {
    return this.authRequestService.post<AlgoInstance>(environment.storeApiUrl + '/v1/clientData/instanceData', data);
  }

  createDemoAlgoIntance(data: AlgoInstance): Observable<AlgoInstance> {
    return this.authRequestService.post(environment.storeApiUrl + '', {data: data}); // TODO add real endpoint
  }

  getAlgoInstances(algoId: string): Observable<AlgoInstance[]> {
    const params = { algoId };
    return this.authRequestService.get(environment.storeApiUrl + '/v1/clientData/instanceData/allByAlgoIdAndClientId', { params });
  }

  getAlgoInstance(algoId: string, instanceId: string): Observable<AlgoInstance> {
    const params = { algoId, instanceId };
    return this.authRequestService.get(environment.storeApiUrl + '/v1/clientData/instanceData', { params });
  }

  deleteAlgoInstance(instance: AlgoInstance): Observable<void> {
    const body = { AlgoId: instance.AlgoId, InstanceId: instance.InstanceId, AlgoClientId: instance.AlgoClientId };
    return this.authRequestService.delete(environment.storeApiUrl + '/v1/clientData/instanceData', { body });
  }

}