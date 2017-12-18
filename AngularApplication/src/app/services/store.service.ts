import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { Algo } from '../models/algo.interface';
import { EventService } from './event.service';

@Injectable()
export class StoreService extends CrudService {

  _algos: BehaviorSubject<Array<Algo>> = <BehaviorSubject<Algo[]>>new BehaviorSubject([]);
  algosStore: Array<any>; // TODO set interface

  public algos: Observable<any>;

  public activeAlgo: Algo;
  public mode: string;

  constructor(
    http: HttpClient, 
    notificationService: NotificationsService, 
    private eventService: EventService) {
    super(http, notificationService);
    
    this.algosStore = [];
    this.algos = this._algos.asObservable();

    this.bindEvents();
  }

  bindEvents() {
    this.eventService.addEvent('algo:deployment:done');
    this.eventService.addEvent('algo:deployment:error');
    this.eventService.addEvent('algo:test:started');
    this.eventService.addEvent('algo:test:stopped');
    this.eventService.addEvent('algo:test:error');
    this.eventService.addEvent('algo:test:updated');
    this.eventService.addEvent('algo:delete:done');
    this.eventService.addEvent('algo:delete:error');
    this.eventService.addEvent('algo:log:done');
    this.eventService.addEvent('algo:log:error');
    this.eventService.addEvent('algo:taillog:done');
    this.eventService.addEvent('algo:taillog:error');
  }

  // algo endpoints

  algoGetAll() {
    this.get('/v1/clientData/metadata')
      .subscribe((data: Algo[]) => {

        this.algosStore = data;
        this._algos.next([...this.algosStore]);
        console.log('Response:' + JSON.stringify(data));
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // Handle 'NotFound'
          this.algosStore = [];
          this._algos.next([]);
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });
  }

  algoCreateDetails(algo: Algo, file?: any) {

    this.post('/v1/clientData/metadata', algo)
      .subscribe((data: any) => {
        
        if(!file) { 
          this.eventService.emitEvent('algo:test:updated');
          return false;
        }

        this.algosStore = data;
        this._algos.next([data]);

        let formData = new FormData();
    
        formData.append('Data', file);
        formData.append('AlgoId', data.Id);

        console.log('Algo created');
        
        this.post('/v1/clientData/imageData/upload/binary', formData )
          .subscribe((res) => {
            
            this.post('/v1/management/deploy/binary', {AlgoId: data.Id})
            .subscribe((res) => {
              this.eventService.emitEvent('algo:deployment:done');
  
            }, (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                this.eventService.emitEvent('algo:deployment:error', {message: err.error.message});
              } else {
                this.eventService.emitEvent('algo:deployment:error', {message: err.error});
              }
            });
          }, (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log('An error occurred:', err.error.message);
            } else {
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
          });
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          this.algosStore = [];
          this._algos.next([]);
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });
  }

  algoStart(algoId){
    this.post('/v1/management/test/start', {AlgoId: algoId})
    .subscribe((res) => {
      this.eventService.emitEvent('algo:test:started');

    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.eventService.emitEvent('algo:test:error', {message: err.error.message});
      } else {
        this.eventService.emitEvent('algo:test:error', {message: err.error});
      }
    });
  }

  algoStop(algoId){
    this.post('/v1/management/test/stop', {AlgoId: algoId})
    .subscribe((res) => {
      this.eventService.emitEvent('algo:test:stopped');

    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.eventService.emitEvent('algo:test:error', {message: err.error.message});
      } else {
        this.eventService.emitEvent('algo:test:error', {message: err.error});
      }
    });
  }

  algoDelete(algo: Algo){
    this.post('/v1/clientData/metadata/cascadeDelete', algo)
    .subscribe((res) => {
      this.eventService.emitEvent('algo:delete:done', {algoId: algo.Id});

    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.eventService.emitEvent('algo:delete:error', {message: err.error.message});
      } else {
        this.eventService.emitEvent('algo:delete:error', {message: err.error});
      }
    });
  }

  algoGetLog(algoId) {
    this.get(`/v1/management/test/log?AlgoId=${algoId}`)
    .subscribe((res) => {

      this.eventService.emitEvent('algo:log:done', {message: res.Log});

    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.eventService.emitEvent('algo:log:error', {message: err.error.message});
      } else {
        this.eventService.emitEvent('algo:log:error', {message: err.error});
      }
    });
  }

  algoGetTailLog(algoId) {
    this.get(`/v1/management/test/tailLog?AlgoId=${algoId}&Tail=1000`)
    .subscribe((res) => {

      this.eventService.emitEvent('algo:taillog:done', {message: res.Log});

    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.eventService.emitEvent('algo:taillog:error', {message: err.error.message});
      } else {
        this.eventService.emitEvent('algo:taillog:error', {message: err.error});
      }
    });
  }
}
