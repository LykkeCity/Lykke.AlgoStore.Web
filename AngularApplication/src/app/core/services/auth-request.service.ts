import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

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

    return this.http.get<T>(url, reqOptions).pipe(
      catchError( error => this.handleError(error) )
    );
  }

  public post<T>(url: string, body: object = {}, options?: object): Observable<T> {
    const headers = {
      'Authorization': 'Bearer ' + this.token
    };
    const reqOptions = Object.assign({}, options, {headers});

    return this.http.post<T>(url, body, reqOptions).pipe(
      catchError( error => this.handleError(error) )
    );
  }

  public put<T>(url: string, body: any = {}, options?: object): Observable<T> {
    const headers = {
      'Authorization': 'Bearer ' + this.token,
    };
    const reqOptions = Object.assign({}, options, {headers});

    return this.http.put<T>(url, body, reqOptions).pipe(
      catchError( error => this.handleError(error) )
    );
  }

  public patch<T>(url: string, body: object = {}, options?: object): Observable<T> {
    const headers = {
      'Authorization': 'Bearer ' + this.token
    };
    const reqOptions = Object.assign({}, options, {headers});

    return this.http.patch<T>(url, body, reqOptions).pipe(
      catchError( error => this.handleError(error) )
    );
  }

  public delete<T>(url: string, options?: object): Observable<T> {
    const headers = {
      'Authorization': 'Bearer ' + this.token
    };
    const reqOptions = { headers, ...options};

    return this.http.request<T>('delete', url, reqOptions).pipe(
      catchError( error => this.handleError(error) )
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      this.router.navigateByUrl('');
      this.authToken.tokenStream.next(null);
    }

    if (error.status === 403) {
      this.notificationsService.error('Forbidden', 'You do not have permission to perform this action.');
      return observableThrowError(error.error);
    }

    if (error.status === 451) {
      this.router.navigate(['legal', 'notification']);
      return observableThrowError(error.error);
    }

    this.notificationsService.error('Error', error.error.DisplayMessage);
    console.error('ApiService::handleError', error);
    return observableThrowError(error.error ? error.error : error);
  }

}
