import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: WebSocket;
  token: string;
  queues: SocketSubscription[] = [];

  constructor(private tokenService: AuthTokenService) {
    this.tokenService.tokenStream.subscribe(token => {
      this.token = token;
    });
  }

  connect(url = environment.wsUrl) {
    this.socket = new WebSocket(url);

    this.socket.addEventListener('open', this.onConnectionOpen.bind(this));
    this.socket.addEventListener('close', this.onConnectionClose.bind(this));
  }

  disconnect() {
    this.socket.close();
  }

  on(queue: string, callback: (message) => void) {
    this.socket.addEventListener(queue, callback);
    this.queues.push({queue, callback});
  }

  send(msg: string) {
    this.socket.send(msg);
  }

  private onConnectionOpen() {
    this.send(this.token);
  }

  private onConnectionClose() {
    this.socket.removeEventListener('open', this.onConnectionOpen);
    this.socket.removeEventListener('close', this.onConnectionOpen);

    this.queues.forEach(sub => {
      this.socket.removeEventListener(sub.queue, sub.callback);
    });

    this.socket = null;
  }
}

interface SocketSubscription {
  queue: string;
  callback: any;
}
