import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Algo } from '../store/models/algo.interface';
import { AuthRequestService } from './auth-request.service';
import { AlgoInstance, IAlgoInstanceStatus } from '../store/models/algo-instance.model';
import { AlgoLog } from '../store/models/algo-log.interface';
import { AlgoInstanceTrade } from '../store/models/algo-instance-trade.model';
import { InstanceStatistic } from '../store/models/algo-instance-statistic.model';
import { UserInstance } from '../store/models/user-instance.interface';

@Injectable()
export class InstanceService {

  constructor(private authRequestService: AuthRequestService) { }

  deployInstance(algoClientId: string, algoId: string, instanceId: string): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/management/deploy/binary', { algoClientId, algoId, instanceId });
  }

  algoStart(algoId: string): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/management/test/start', { AlgoId: algoId });
  }

  stopInstance(algoId: string, instanceId: string, algoClientId: string): Observable<Algo> {
    return this.authRequestService.post(
      environment.storeApiUrl + '/v1/management/stop', { AlgoId: algoId, InstanceId: instanceId, AlgoClientId: algoClientId }
    );
  }

  editName(instanceId: string, data: {name: string}): Observable<string> {
    return this.authRequestService.put(environment.storeApiUrl + `/v1/algoInstances/${instanceId}/name`, data);
  }

  algoDelete(algo: Algo): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/clientData/metadata/cascadeDelete', algo);
  }

  getInstanceLogs(AlgoId: string, InstanceId: string, AlgoClientId: string, Tail: number = 100): Observable<AlgoLog> {
    const params = { AlgoId, InstanceId, AlgoClientId, Tail };
    return this.authRequestService.get(environment.storeApiUrl + `/v1/management/tailLog`, { params });
  }

  getInstanceTrades(instanceId: string): Observable<AlgoInstanceTrade[]> {
    const params = { instanceId: instanceId };
    return this.authRequestService.get(environment.storeApiUrl + '/v1/trades', { params });
  }

  getInstanceStatistics(instanceId: string): Observable<InstanceStatistic> {
    const params = { instanceId: instanceId };
    return this.authRequestService.get(environment.storeApiUrl + '/v1/statistics', { params });
  }

  getInstanceStatus(instanceId: string): Observable<IAlgoInstanceStatus> {
    return this.authRequestService.get(environment.storeApiUrl + `/v1/algoInstances/${instanceId}/status`);
  }

  createLiveAlgoIntance(data): Observable<AlgoInstance> {
    return this.authRequestService.post<AlgoInstance>(environment.storeApiUrl + '/v1/algoInstances/saveAlgoInstance', data);
  }

  fakeTrading(data: AlgoInstance): Observable<AlgoInstance> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/algoInstances/fakeTradingInstanceData', data);
  }

  getAlgoInstances(algoId: string): Observable<AlgoInstance[]> {
    const params = { algoId };
    return this.authRequestService.get(environment.storeApiUrl + '/v1/algoInstances/getAllByAlgoIdAndClientId', { params });
  }

  getAlgoInstance(algoId: string, instanceId: string): Observable<AlgoInstance> {
    const params = { algoId, instanceId };
    return this.authRequestService.get(environment.storeApiUrl + '/v1/algoInstances/getAlgoInstance', { params });
  }

  getUserInstances(): Observable<UserInstance[]> {
    return this.authRequestService.get(environment.storeApiUrl + '/v1/algoInstances/userInstances');
  }

  deleteAlgoInstance(instance: AlgoInstance): Observable<void> {
    const body = { AlgoId: instance.AlgoId, InstanceId: instance.InstanceId, AlgoClientId: instance.AlgoClientId };
    return this.authRequestService.delete(environment.storeApiUrl + '/v1/algoInstances', { body });
  }

}
