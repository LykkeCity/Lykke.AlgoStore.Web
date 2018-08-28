import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Algo } from '../../store/models/algo.interface';
import { AuthRequestService } from './auth-request.service';
import { AlgoInstance, IAlgoInstanceStatus } from '../../store/models/algo-instance.model';
import { AlgoLog } from '../../store/models/algo-log.interface';
import { AlgoInstanceTrade } from '../../store/models/algo-instance-trade.model';
import { InstanceStatistic } from '../../store/models/algo-instance-statistic.model';
import { UserInstance } from '../../store/models/user-instance.interface';
import { Candle } from '../../shared/chart/models/candle.model';
import { Function } from '../../shared/chart/models/function.model';

@Injectable()
export class InstanceService {

  constructor(private authRequestService: AuthRequestService) { }

  stopInstance(algoId: string, instanceId: string): Observable<Algo> {
    return this.authRequestService.post(
      environment.storeApiUrl + '/v1/management/stop', { AlgoId: algoId, InstanceId: instanceId }
    );
  }

  editName(instanceId: string, data: {name: string}): Observable<string> {
    return this.authRequestService.put(environment.storeApiUrl + `/v1/algoInstances/${instanceId}/name`, data);
  }

  getInstanceLogs(AlgoId: string, InstanceId: string, Tail: number = 100): Observable<AlgoLog> {
    const params = { AlgoId, InstanceId, Tail };
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

  getHistoricalTrades(instanceId: string, tradedAssetId: string, fromMoment: string, toMoment: string): Observable<AlgoInstanceTrade[]> {
    const params = { instanceId, tradedAssetId, fromMoment, toMoment };
    return this.authRequestService.get(environment.storeApiUrl + '/v1/history/trades', { params });
  }

  getHistoricalCandles(assetPairId: string, priceType: number, timeInterval: string, fromMoment: string, toMoment: string): Observable<Candle[]> {
    return this.authRequestService.get(environment.storeApiUrl + `/v1/history/candles/${assetPairId}/${priceType}/${timeInterval}/${fromMoment}/${toMoment}`);
  }

  getHistoricalFunctions(instanceId: string, fromMoment: string, toMoment: string): Observable<Function[]> {
    const params = { instanceId, fromMoment, toMoment };
    return this.authRequestService.get(environment.storeApiUrl + '/v1/history/functions', { params });
  }

}
