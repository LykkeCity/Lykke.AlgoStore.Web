import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class AuthService {

  _isAuthenticated: boolean;
  localAuthUrl: string;
  redirectUri: string;
  authenticationUrl: string;

  constructor(private http: HttpClient,
              private authToken: AuthTokenService,
              private router: Router) {

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

    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('algo-token') };


    this.http.post(environment.apiUrl + '/Auth/LogOut', '', { headers }).subscribe(response => {
      this.authToken.tokenStream.next(null);
      this.router.navigateByUrl('');
    });
  }
}
