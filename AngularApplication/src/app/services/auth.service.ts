import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  _isAuthenticated: boolean;
  localAuthUrl: string;
  redirectUri: string;
  authenticationUrl: string;

  constructor(private http: HttpClient) {

    this._isAuthenticated = false;
    this.redirectUri = environment.redirectUrl;

    this.localAuthUrl = environment.authUrl;
    this.authenticationUrl = environment.apiAuthUrl + '/connect/authorize' +
      '?client_id=' + encodeURIComponent(environment.applicationId) +
      '&response_type=code' +
      '&redirect_uri=' + encodeURIComponent(environment.redirectUrl);
  }

  login(): void {
    localStorage.setItem('lpp-return-url', window.location.pathname);
    window.location.replace(this.authenticationUrl);
  }

  logout(redirectFlag: boolean = true): void {

    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };


    this.http.post(environment.apiUrl + '/Auth/LogOut', '', { headers }).subscribe(response => {
      localStorage.removeItem('token');
      this._isAuthenticated = false;
      if (redirectFlag) {
        this.login();
      }
    });
  }
}
