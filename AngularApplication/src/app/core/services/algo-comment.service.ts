import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AlgoComment } from '../../models/algo-comment.model';
import { AuthRequestService } from './auth-request.service';

@Injectable()
export class AlgoCommentService {

  constructor(private authRequestService: AuthRequestService) { }

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
