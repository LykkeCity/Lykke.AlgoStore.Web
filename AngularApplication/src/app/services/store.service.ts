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

        if (!file) {
          this.eventService.algoTestUpdated.next();
          return false;
        }

        this.algosStore = data;
        this._algos.next([data]);

        const formData = new FormData();

        formData.append('Data', file);
        formData.append('AlgoId', data.Id);

        console.log('Algo created');

        this.post('/v1/clientData/imageData/upload/binary', formData )
          .subscribe((res) => {

            this.post('/v1/management/deploy/binary', {AlgoId: data.Id})
            .subscribe(() => {
              this.eventService.algoDeploymentDone.next();

            }, (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                this.eventService.algoDeploymentError.next({message: err.error.message});
              } else {
                this.eventService.algoDeploymentError.next({message: err.error});
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

  algoStart(algoId) {
    this.post('/v1/management/test/start', {AlgoId: algoId})
    .subscribe((res) => {
      this.eventService.algoTestStarted.next();

    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.eventService.algoTestError.next({message: err.error.message});
      } else {
        this.eventService.algoTestError.next({message: err.error});
      }
    });
  }

  algoStop(algoId) {
    this.post('/v1/management/test/stop', {AlgoId: algoId})
    .subscribe((res) => {
      this.eventService.algoTestStopped.next();

    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.eventService.algoTestError.next({message: err.error.message});
      } else {
        this.eventService.algoTestError.next({message: err.error});
      }
    });
  }

  algoDelete(algo: Algo) {
    this.post('/v1/clientData/metadata/cascadeDelete', algo)
    .subscribe((res) => {
      this.eventService.algoDeleteDone.next({algoId: algo.Id});

    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.eventService.algoDeleteError.next({message: err.error.message});
      } else {
        this.eventService.algoDeleteError.next({message: err.error});
      }
    });
  }

  algoGetLog(algoId) {
    this.get(`/v1/management/test/log?AlgoId=${algoId}`)
    .subscribe((res) => {
      this.eventService.algoLogDone.next({message: res.Log});

    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.eventService.algoLogError.next({message: err.error.message});
      } else {
        this.eventService.algoLogError.next({message: err.error});
      }
    });
  }

  algoGetTailLog(algoId) {
    this.get(`/v1/management/test/tailLog?AlgoId=${algoId}&Tail=1000`)
    .subscribe((res) => {
      this.eventService.algoTaillogDone.next({message: res.Log});

    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.eventService.algoTaillogError.next({message: err.error.message});
      } else {
        this.eventService.algoTaillogError.next({message: err.error});
      }
    });
  }
}
