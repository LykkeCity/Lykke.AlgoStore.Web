import { Injectable } from '@angular/core';
import { Algo } from '../store/models/algo.interface';
import { AuthRequestService } from './auth-request.service';
import { Observable } from 'rxjs/Observable';
import { AlgoLog } from '../store/models/algo-log.interface';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { environment } from '../../environments/environment';
import { AlgoInstance } from '../store/models/algo-instance.model';
import { AlgoRating } from '../store/models/algo-rating.model';
import { AlgoComment } from '../models/algo-comment.model';

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

  getAlgoWithSource(algoId: string, clientId?: string): Observable<Algo> {
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

  algoGetLog(algoId: string): Observable<Algo> {
    return this.authRequestService.get(environment.storeApiUrl + `/v1/management/test/log?AlgoId=${algoId}`);
  }

  algoGetTailLog(AlgoId: string, InstanceId: string, AlgoClientId: string, Tail: number = 100): Observable<AlgoLog> {
    const params = { AlgoId, InstanceId, AlgoClientId, Tail };
    return this.authRequestService.get(environment.storeApiUrl + `/v1/management/test/tailLog`, { params });
  }

  createLiveAlgoIntance(data): Observable<AlgoInstance> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/clientData/instanceData', data);
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

  getUserAlgoRating(AlgoId: string, clientId?: string): Observable<AlgoRating> {
    const params = { AlgoId };

    if (clientId) {
      params['ClientId'] = clientId;
    }
    return this.authRequestService.get(environment.storeApiUrl + '/v1/clientData/userAlgoRating', { params });
  }

  saveAlgoRating(ratingData: AlgoRating): Observable<AlgoRating> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/clientData/algoRating', ratingData);
  }

  getCommentById(AlgoId: string, CommentId: string): Observable<AlgoComment> {
    const params = { AlgoId, CommentId };
    return this.authRequestService.get(environment.storeApiUrl + '/v1/comments/getCommentById', { params });
  }

  getAlgoComments(AlgoId: string): Observable<AlgoComment[]> {
    const params = { AlgoId };
    return this.authRequestService.get(environment.storeApiUrl + '/v1/comments/algoComments', { params });
  }

  saveComment(comment: AlgoComment): Observable<AlgoComment> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/comments/algoComments', comment);
  }

  editComment(comment: AlgoComment): Observable<AlgoComment> {
    return this.authRequestService.patch(environment.storeApiUrl + '/v1/comments/algoComments', comment);
  }

  deleteComment(AlgoId: string, CommentId: string): Observable<AlgoComment> {
    const params = { AlgoId, CommentId };
    return this.authRequestService.delete(environment.storeApiUrl + '/v1/comments/algoComments', { params });
  }
}
