import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;
  private stompClient;

  public initSocket(url = 'ws://127.0.0.10:9921'): void {
    this.socket = socketIo(url, {
      path: '',
      forceNew: true,
      debug: true,
      log: true
    });
    console.log(this.socket);

  }

  public initializeWebSocketConnection(url = 'http://127.0.0.10:9921') {
    const ws = new SockJS(url);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe('message', (message) => {
        console.log(message);
      });
    });
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public onData<T>(): Observable<T> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data: any) => {
        console.log(data);
        observer.next(data);
      });
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on('connect', (data) => {
        console.log(data);
        observer.next();
      });

      this.socket.on('disconnect', (data) => {
        console.log(data);
        observer.next();
      });

      this.socket.on('ping', (data) => {
        console.log(data);
        observer.next();
      });

      this.socket.on('error', (data) => {
        console.log(data);
        observer.next();
      });
    });
  }
}

// Socket.io events
export enum Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}

export interface Message {
  id?: string;
  payload?: string;
}
