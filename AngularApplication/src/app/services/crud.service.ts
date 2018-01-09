import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export interface UrlParams {
  param: string;
  value: string;
}
export abstract class CrudService {

  token: string;
  requestOptions: RequestOptions;
  requestOptionsFile: RequestOptions;

  constructor(private http, private notificationsService) { }

  get(url, queryParams?) {
    if (queryParams) {
      this.setQueryParams(queryParams);
    }

    return this.http.get(environment.storeApiUrl + url)
      .map((response: Response) => response);
  }

  put(url, data?) {
    return this.http.put(environment.storeApiUrl + url, data);
  }

  post(url, file) {
    return this.http.post(environment.storeApiUrl + url, file)
      .map((response: Response) => response);
  }

  delete(url, data?) {
    return this.http.delete(environment.storeApiUrl + url, data, this.requestOptions)
      .map((response: Response) => response);
  }


  private setQueryParams(queryParams) {
    this.requestOptions.params = new URLSearchParams();
    this.requestOptions.params = queryParams;
  }

  handleError(errorResponse: Response | any) {
    this.notificationsService.error('Error', 'Error accoured.');
    console.error('ApiService::handleError', errorResponse);
    return Observable.throw('Error');
  }
}
