import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs/Subscription';
import { BsModalService } from 'ngx-bootstrap/modal';

import { StoreService } from '../../services/store.service';
import { Command } from '../../models/command.enum';
import { Status } from '../../models/status.enum';
import { Algo } from '../../store/models/algo.interface';
import { EventService } from '../../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent {

  @Input() algo: Algo;

  Command = Command;

  subscribeToStart: Subscription;
  subscribeToStop: Subscription;
  subscribeToDelete: Subscription;

  constructor(private storeService: StoreService,
              private eventService: EventService,
              private notificationService: NotificationsService,
              private router: Router,
              private modalService: BsModalService) {
  }

  doCommand(command?: Command): boolean {
    if (!command) {
      if (this.algo.Status === Status.DEPLOYED || this.algo.Status === Status.UNKNOWN || this.algo.Status === Status.STOPPED) {
        const initialState = {
          popupConfig: {
            hideIcon: true,
            data: { algoId: this.algo.Id },
            name: 'startAlgoWarning',
            title: 'Start Algo?',
            text: 'Are you sure you want to start running the Algo?',
            btnCancelText: 'No, I don’t want',
            btnConfirmText: 'Yes, Start Algo',
            successCallback: this.startAlgo.bind(this)
          }
        };

        this.modalService.show(PopupComponent, { initialState, class: 'modal-sm custom-popup' });
      } else {
        const initialState = {
          popupConfig: {
            hideIcon: true,
            data: { algoId: this.algo.Id },
            name: 'stopAlgoWarning',
            title: 'Stop Algo?',
            text: 'Are you sure you want to stop running the Algo?',
            btnCancelText: 'No, I don’t want',
            btnConfirmText: 'Yes, Stop Algo',
            successCallback: this.stopAlgo.bind(this)
          }
        };

        this.modalService.show(PopupComponent, { initialState, class: 'modal-sm custom-popup' });
      }
    } else {
      switch (command) {

        case Command.Edit:
          this.router.navigate(['store', 'algo-edit', this.algo.ClientId, this.algo.Id]);
          break;

        case Command.Delete:

          const initialState = {
            popupConfig: {
              hideIcon: true,
              data: { algoId: this.algo.Id },
              name: 'deleteAlgoWarning',
              width: 370,
              title: 'Delete Algo?',
              text: 'Are you sure you want to delete this Algo from your list?',
              btnCancelText: 'No, I don’t want',
              btnConfirmText: 'Yes, Delete Algo',
              successCallback: this.deleteAlgo.bind(this)
            }
          };

          this.modalService.show(PopupComponent, { initialState, class: 'modal-sm custom-popup' });
          break;
      }
    }

    return false;
  }

  deleteAlgo(): void {
    this.subscribeToDelete = this.storeService.algoDelete(this.algo)
      .subscribe(
        this.onAlgoDeleteDone,
        this.onAlgoDeleteError
      );
  }

  startAlgo(): void {
    this.subscribeToStart = this.storeService.algoStart(this.algo.Id).subscribe(this.onAlgoTestStarted,
      this.onAlgoTestError);
  }

  stopAlgo(): void {
    this.subscribeToStop = this.storeService.algoStop(this.algo.Id)
      .subscribe(
        this.onAlgoTestStopped,
        this.onAlgoTestError);
  }

  onAlgoTestStarted = () => {
    this.algo.Status = Status.STARTED;
    this.eventService.algoTestStarted.next(Status.STARTED);

    this.subscribeToStart.unsubscribe();
  };

  onAlgoTestStopped = () => {
    this.algo.Status = Status.STOPPED;
    this.eventService.algoTestStopped.next(Status.STOPPED);
    this.subscribeToStop.unsubscribe();
  };

  onAlgoDeleteDone = () => {
    this.eventService.algoDeleteDone.next();
    this.router.navigate(['store/algo-list']);
  };

  onAlgoDeleteError = (err: HttpErrorResponse) => {
    this.notificationService.error('Error', 'Some error occured!');
    this.unsubscribe();
  };

  onAlgoTestError = (err: HttpErrorResponse) => {
    this.notificationService.error('Error', 'Some error occured!');
    this.unsubscribe();
  };

  unsubscribe(): void {
    if (this.subscribeToStart) {
      this.subscribeToStart.unsubscribe();
    }

    if (this.subscribeToStop) {
      this.subscribeToStop.unsubscribe();
    }

    if (this.subscribeToDelete) {
      this.subscribeToDelete.unsubscribe();
    }
  }
}
