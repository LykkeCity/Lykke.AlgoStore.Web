import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StompRService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { AuthTokenService } from './auth-token.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  token: string;
  clientId: string;

  private subscriptions: { [key: string]: Observable<any> } = {};

  constructor(private stompService: StompRService, private tokenService: AuthTokenService, private usersService: UserService) {

    this.tokenService.tokenStream.subscribe(token => {
      this.token = token;
    });

      this.usersService.loggedUserSubject.subscribe(user => {
          this.clientId = user.ClientId;
      });
  }

  public connect() {
    this.stompService.config = {
      url: environment.wsUrl,

      // Headers
      // Typical keys: login, passcode, host
      headers: {
        login: this.clientId,
        passcode: this.token
      },

      // How often to heartbeat?
      // Interval in milliseconds, set to 0 to disable
      heartbeat_in: 0, // Typical value 0 - disabled
      heartbeat_out: 10000, // Typical value 10000 - every 10 seconds

      // Wait in milliseconds before attempting auto reconnect
      // Set to 0 to disable
      // Typical value 5000 (5 seconds)
      reconnect_delay: 5000,

      // Will log diagnostics on console
      debug: false
    };
    this.stompService.initAndConnect();
  }

  public disconnect() {
    this.stompService.disconnect();
    this.subscriptions = {};
  }

  public on(queueName: string): Observable<any> {
    if (!this.subscriptions[queueName]) {
      this.subscriptions[queueName] = this.stompService
        .subscribe(queueName)
        .map((message: Message) => {
          return JSON.parse(message.body);
        });
    }

    return this.subscriptions[queueName];
  }
}
