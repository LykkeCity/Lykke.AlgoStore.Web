import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable ,  forkJoin } from 'rxjs';
import { Algo } from '../../store/models/algo.interface';
import { AuthRequestService } from './auth-request.service';
import { AssetPair } from '../../store/models/asset-pair.interface';

@Injectable()
export class AlgoService {

  constructor(private authRequestService: AuthRequestService) { }

  getAllPublicAlgos(): Observable<Algo[]> {
    return this.authRequestService.get(environment.storeApiUrl + '/v1/algo/getAllAlgos');
  }

  getMyAlgos(): Observable<Algo[]> {
    return this.authRequestService.get(environment.storeApiUrl + '/v1/algo/getAllUserAlgos');
  }

  createAlgo(algo: Algo): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/algo/create', algo);
  }

  editAlgo(algo: Algo): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/algo/edit', algo);
  }

  delete(deleteModel: any): Observable<Algo> {
    return this.authRequestService.delete(environment.storeApiUrl + '/v1/algo/delete', { body: deleteModel });
  }

  publish(AlgoId: string): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/algo/addToPublic', { AlgoId });
  }

  unpublish(AlgoId: string): Observable<Algo> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/algo/removeFromPublic', { AlgoId });
  }

  getAlgoWithSource(algoId: string): Observable<Algo> {
    const params = { algoId };

    return forkJoin(
      this.authRequestService.get(environment.storeApiUrl + '/v1/algo/getAlgoInformation', { params }),
      this.getAlgoSource(algoId)
    ).map( (res: any) => ({...res[0], ...res[1]}) );
  }

  getAlgoSource(algoId: string): Observable<{ Content: string }> {
    const params = { algoId };

    return this.authRequestService.get(environment.storeApiUrl + '/v1/algo/sourceCode/getString', { params });
  }

  getAssetsByAssetPair(assetPairId: string): Observable<AssetPair[]> {
    const params = { assetPairId };
    return this.authRequestService.get(environment.storeApiUrl + '/v1/algo/getAssetsForAssetPair', { params });
  }
}
