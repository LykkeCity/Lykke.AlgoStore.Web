import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpParams/*, HttpHeaders*/ } from '@angular/common/http';

import { NotificationsService } from 'angular2-notifications/dist';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  _isAuthenticated: boolean;
  localAuthUrl: string;
  redirectUri: string;
  authenticationUrl: string;

  constructor(private http: HttpClient,
    private notificationService: NotificationsService,
    private router: Router) {

    this._isAuthenticated = false;
    this.redirectUri = environment.redirectUrl;

    this.localAuthUrl = environment.authUrl;
    this.authenticationUrl = environment.apiAuthUrl + '/connect/authorize' +
      '?client_id=' + environment.applicationId +
      '&response_type=code' +
      '&redirect_uri=' + environment.redirectUrl;
  }

  getAccessToken(code) {
    const queryParams = {
      code
    };

    this.http.get(this.localAuthUrl, { params: queryParams })
      .subscribe((response: Response) => this.getWalletToken(response));
  }

  authenticate(data) {
    this.setToken(data);
    this._isAuthenticated = true;

    const returnUrl = localStorage.getItem('returnUrl');
    if (returnUrl) {
      localStorage.removeItem('returnUrl');
      this.router.navigate([returnUrl]);
    }
  }

  login() {
    localStorage.setItem('returnUrl', window.location.pathname);
    window.location.replace(this.authenticationUrl);
  }

  logout(redirectFlag = true) {

    const headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')};


    this.http.post(environment.apiUrl + '/Auth/LogOut', '', { headers }).subscribe(response => {
      localStorage.removeItem('token');
      this._isAuthenticated = false;
      if (redirectFlag) {
        this.login();
      }
    });
  }

  getWalletToken(data) {

    const headers = {
      'application_id': environment.applicationId,
      'Authorization': data.token_type + ' ' + data.access_token
    };

    this.http.get(environment.apiAuthUrl + '/getlykkewallettoken', { headers }).subscribe((response: Response) => this.authenticate(response));
  }

  setToken(data) {
    localStorage.setItem('token', data.token);
  }

  isAuthenticated() {
    return this._isAuthenticated;
  }
}
