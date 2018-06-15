import { Injectable } from '@angular/core';
import { AlgoRating } from '../store/models/algo-rating.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthRequestService } from './auth-request.service';

@Injectable()
export class AlgoRatingService {

  constructor(private authRequestService: AuthRequestService) { }

  getUserAlgoRating(AlgoId: string, clientId?: string): Observable<AlgoRating> {
    const params = { AlgoId };

    if (clientId) {
      params['ClientId'] = clientId;
    }
    return this.authRequestService.get(environment.storeApiUrl + '/v1/algo/userAlgoRating', { params });
  }

  saveAlgoRating(ratingData: AlgoRating): Observable<AlgoRating> {
    return this.authRequestService.post(environment.storeApiUrl + '/v1/algo/algoRating', ratingData);
  }

}
