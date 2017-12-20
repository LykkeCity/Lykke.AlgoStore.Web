import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token && request.url !== environment.authUrl && request.url !== environment.tokenUrl) {
      request = request.clone({
        setHeaders: {
          'Accept': 'application/json, */*',
          'Authorization': 'Bearer ' + token
        }
      });
    }
    return next.handle(request);
  }
}
