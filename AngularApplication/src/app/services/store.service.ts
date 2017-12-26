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

  _algos = new BehaviorSubject<Array<Algo>>([]);
  algosStore: Array<any>; // TODO set interface

  public algos = this._algos.asObservable();

  public activeAlgo: Algo;
  public mode: string;

  constructor(
    http: HttpClient,
    notificationService: NotificationsService,
    private eventService: EventService) {
    super(http, notificationService);

    this.algosStore = [];
  }

  algoGetAll() {
    return this.get('/v1/clientData/metadata');
  }

  algoCreateDetails(algo: Algo) {

    return this.post('/v1/clientData/metadata', algo);

    // this.post('/v1/clientData/metadata', algo)
    //   .subscribe((data: any) => {

    //     if (!file) {
    //       this.eventService.algoTestUpdated.next();
    //       return false;
    //     }

    //     this.algosStore = data;
    //     this._algos.next([data]);

    //     const formData = new FormData();

    //     formData.append('Data', file);
    //     formData.append('AlgoId', data.Id);

    //     console.log('Algo created');

    //     this.post('/v1/clientData/imageData/upload/binary', formData)
    //       .subscribe((res) => {

    //         this.post('/v1/management/deploy/binary', { AlgoId: data.Id })
    //           .subscribe(() => {
    //             this.eventService.algoDeploymentDone.next();

    //           }, (err: HttpErrorResponse) => {
    //             if (err.error instanceof Error) {
    //               this.eventService.algoDeploymentError.next({ message: err.error.message });
    //             } else {
    //               this.eventService.algoDeploymentError.next({ message: err.error });
    //             }
    //           });
    //       }, (err: HttpErrorResponse) => {
    //         if (err.error instanceof Error) {
    //           console.log('An error occurred:', err.error.message);
    //         } else {
    //           console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    //         }
    //       });
    //   }, (err: HttpErrorResponse) => {
    //     if (err.error instanceof Error) {
    //       console.log('An error occurred:', err.error.message);
    //     } else {
    //       this.algosStore = [];
    //       this._algos.next([]);
    //       console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    //     }
    //   });
  }

  algoUpload(formData: FormData) {
    return this.post('/v1/clientData/imageData/upload/binary', formData);
  }

  algoDeploy(data: any) {
    return this.post('/v1/management/deploy/binary', { AlgoId: data.Id });
  }

  algoStart(algoId) {
    return this.post('/v1/management/test/start', { AlgoId: algoId });
  }

  algoStop(algoId) {
    return this.post('/v1/management/test/stop', { AlgoId: algoId });
  }

  algoDelete(algo: Algo) {
    return this.post('/v1/clientData/metadata/cascadeDelete', algo);
  }

  algoGetLog(algoId) {
    return this.get(`/v1/management/test/log?AlgoId=${algoId}`);
  }

  algoGetTailLog(algoId, tail) {
    return this.get(`/v1/management/test/tailLog?AlgoId=${algoId}&Tail=${tail}`);
  }
}
