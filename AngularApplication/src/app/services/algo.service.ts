import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Algo } from '../store/models/algo.interface';
import { AuthRequestService } from './auth-request.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class AlgoService {

  constructor(private authRequestService: AuthRequestService) { }

  getAllPublicAlgos(): Observable<Algo[]> {
    return this.authRequestService.get(environment.storeApiUrl + '/v1/algo/getAllAlgos');
  }

  getMyAlgos(): Observable<Algo[]> {
    return this.authRequestService.get(environment.storeApiUrl = ''); // TODO add real API url
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

    return this.authRequestService.get(environment.storeApiUrl + '/v1/algo/getAlgoInformation', { params });
  }

  getAlgoWithSource(algoId: string, clientId?: string): Observable<Algo> {
    const params = { algoId };

    if (clientId) {
      params['clientId'] = clientId;
    }

    return forkJoin(
      this.authRequestService.get(environment.storeApiUrl + '/v1/algo/getAlgoInformation', { params }),
      this.algoGetSource(algoId, clientId)
    ).map( res => ({...res[0], ...res[1]}) );
  }

  algoGetSource(algoId: string, clientId?: string): Observable<Algo> {
    const params = { algoId };

    if (clientId) {
      params['clientId'] = clientId;
    }
    return this.authRequestService.get(environment.storeApiUrl + '/v1/algo/sourceCode/getString', { params });
  }

  algoSave(algoId: string, data: string): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + `/v1/algo/sourceCode/upload/string`, { AlgoId: algoId, Data: data });
  }

  algoUpload(formData: FormData): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/algo/sourceCode/upload/binary', formData);
  }
}
