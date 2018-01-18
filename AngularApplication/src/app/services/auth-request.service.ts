import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthRequestService {

  token: string;

  constructor(private http: HttpClient,
              private authToken: AuthTokenService,
              private router: Router,
              private notificationsService: NotificationsService) {

    this.authToken.tokenStream.subscribe(
      token => {
        this.token = token;
      }
    );

  }

  public get<T>(url: string, options?: object): Observable<T> {
    const headers = {
      'Authorization': 'Bearer ' + this.token
    };
    const reqOptions = Object.assign({}, options, {headers});

    return this.http.get(environment.storeApiUrl + url, reqOptions).pipe(
      catchError( error => this.handleError(error) )
    );
  }

  public post<T>(url: string, body: object = {}, options?: object): Observable<T> {
    const headers = {
      'Authorization': 'Bearer ' + this.token
    };
    const reqOptions = Object.assign({}, options, {headers});

    return this.http.post(environment.storeApiUrl + url, body, reqOptions).pipe(
      catchError( error => this.handleError(error) )
    );
  }

  public delete<T>(url: string, options?: object): Observable<T> {
    const headers = {
      'Authorization': 'Bearer ' + this.token
    };
    const reqOptions = Object.assign({}, options, {headers});

    return this.http.delete(environment.storeApiUrl + url, reqOptions).pipe(
      catchError( error => this.handleError(error) )
    );
  }

  private handleError(error) {
    if (error.status === 401) {
      this.router.navigateByUrl('');
      this.authToken.tokenStream.next(null);
    }

    this.notificationsService.error('Error', 'Error occurred.');
    console.error('ApiService::handleError', error);
    return Observable.throw('Error');
  }

}
