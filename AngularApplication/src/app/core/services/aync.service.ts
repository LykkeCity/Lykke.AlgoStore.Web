import { Injectable } from '@angular/core';
import { StompConfig, StompRService, StompState } from '@stomp/ng2-stompjs';
import { Observable } from 'rxjs/Observable';
import { Message } from '@stomp/stompjs';
import { ReplaySubject } from 'rxjs/ReplaySubject';
// import { AsyncDataModel } from '../models/async-data.model';
// import { AsyncErrorModel } from '../models/async-error.model';

// Web socket, stompjs wrapper
@Injectable({
  providedIn: 'root'
})
export class AsyncService {
  private connectedSource = new ReplaySubject<boolean>();
  private subscriptions: { [key: string]: Observable<any> } = {};
  public connected = this.connectedSource.asObservable();

  constructor(private stompService: StompRService) {

    this.stompService.state.asObservable().subscribe((stompState) => {
      if (stompState === StompState.CONNECTED) {
        this.connectedSource.next(true);
      } else if (stompState === StompState.CLOSED) {
        this.connectedSource.next(false);
      }
    });
  }

  // Establish new web socket connection
  // Use only when user was already authenticated else errors will occur (visible in the browser console)
  // In case of connection issues browser will automatically try to re-establish dropped connection
  public connect() {
    const webSocketProtocol = window.location.protocol.toLowerCase() === 'https:' ? 'wss' : 'ws';

    const config: StompConfig = {
      // url: `${webSocketProtocol}://${window.location.host}${environment.webSocketBaseUrl}`,
      // url: 'ws://127.100.100.1:9998',
      url: 'ws://demos.kaazing.com/echo',

      // Headers
      // Typical keys: login, passcode, host
      headers: {
        'Sec-WebSocket-Protocol': 'x-kaazing-handshake'
      },

      // How often to heartbeat?
      // Interval in milliseconds, set to 0 to disable
      heartbeat_in: 0, // Typical value 0 - disabled
      heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

      // Wait in milliseconds before attempting auto reconnect
      // Set to 0 to disable
      // Typical value 5000 (5 seconds)
      reconnect_delay: 5000,

      // Will log diagnostics on console
      debug: true
    };
    // console.log(config);
    this.stompService.config = config;
    this.stompService.initAndConnect();
    this.stompService.connectObservable.subscribe((f) => {
      console.log(f);
    });

    this.stompService.defaultMessagesObservable.subscribe((m) => {
      console.log(m);
    })
  }

  // Disconnect web socket
  // Browser will stop trying to establish new connection unless openWebSocketConnection() called again
  public disconnect() {
    this.stompService.disconnect();
    this.subscriptions = {};
  }

  public subscribe(queueName: string): Observable<any> {
    console.log(queueName);
    if (!this.subscriptions[queueName]) {
      this.subscriptions[queueName] = this.stompService
        .subscribe(queueName)
        .map((message: Message) => {
          console.log(message);
          return JSON.parse(message.body);
        });
    }

    this.stompService.subscribe('handshake').map((m) => {
      console.log(m);
    });

    return this.subscriptions[queueName];
  }
}
