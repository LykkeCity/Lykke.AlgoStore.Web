import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

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

    return this.http.get(url, reqOptions).pipe(
      catchError( error => this.handleError(error) )
    );
  }

  public post<T>(url: string, body: object = {}, options?: object): Observable<T> {
    const headers = {
      'Authorization': 'Bearer ' + this.token
    };
    const reqOptions = Object.assign({}, options, {headers});

    return this.http.post(url, body, reqOptions).pipe(
      catchError( error => this.handleError(error) )
    );
  }

  public patch<T>(url: string, body: object = {}, options?: object): Observable<T> {
    const headers = {
      'Authorization': 'Bearer ' + this.token
    };
    const reqOptions = Object.assign({}, options, {headers});

    return this.http.patch(url, body, reqOptions).pipe(
      catchError( error => this.handleError(error) )
    );
  }

  public delete<T>(url: string, options?: object): Observable<T> {
    const headers = {
      'Authorization': 'Bearer ' + this.token
    };
    const reqOptions = { headers, ...options};

    return this.http.request('delete', url, reqOptions).pipe(
      catchError( error => this.handleError(error) )
    );
  }

  private handleError(error: HttpErrorResponse): ErrorObservable {
    if (error.status === 401) {
      this.router.navigateByUrl('');
      this.authToken.tokenStream.next(null);
    }

    this.notificationsService.error('Error', 'Error occurred.');
    console.error('ApiService::handleError', error);
    return Observable.throw('Error');
  }

}
