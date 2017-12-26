import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from '../../services/store.service';
import { Command } from '../../models/command.enum';
import { Status } from '../../models/status.enum';
import { Algo } from '../../models/algo.interface';
import { EventService } from '../../services/event.service';
import { PopupConfig } from '../../models/popup.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit, OnDestroy {

  @Input() algo: Algo;

  Command: any = Command;
  Status: any = Status;

  private subscriptions = new Subscription();

  subscribeToStart: any;
  subscribeToStop: any;
  subscribeToDelete: any;

  constructor(
    private storeService: StoreService,
    private eventService: EventService,
    private notificationService: NotificationsService,
    private router: Router) {}

  ngOnInit() {
    this.subscriptions.add(this.eventService.popupConfirm.subscribe(this.onPopupConfirm));
    this.subscriptions.add(this.eventService.popupCancel.subscribe(this.onPopupCancel));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  doCommand(command?: Command) {
    if (!command) {
      if (this.algo.Status === Status.DEPLOYED || this.algo.Status === Status.UNKNOWN || this.algo.Status === Status.STOPPED) {
        const popupConfig: PopupConfig = {
          hideIcon: true,
          name: 'startAlgoWarning',
          width: 370,
          title: 'Start Algo?',
          text: 'Are you sure you want to start running the Algo?',
          btnCancelText: 'No, I don’t want',
          btnConfirmText: 'Yes, Start Algo'
        };

        this.eventService.popupOpen.next(popupConfig);
      } else {
        const popupConfig: PopupConfig = {
          hideIcon: true,
          name: 'stopAlgoWarning',
          width: 370,
          title: 'Stop Algo?',
          text: 'Are you sure you want to stop running the Algo?',
          btnCancelText: 'No, I don’t want',
          btnConfirmText: 'Yes, Stop Algo'
        };

        this.eventService.popupOpen.next(popupConfig);
      }
    } else {
      switch (command) {

        case Command.Edit:
          this.storeService.activeAlgo = this.algo;
          this.router.navigate(['store/algo-edit']);
          break;

        case Command.Delete:

          const popupConfig: PopupConfig = {
            hideIcon: true,
            data: { algoId: this.algo.Id },
            name: 'deleteAlgoWarning',
            width: 370,
            title: 'Delete Algo?',
            text: 'Are you sure you want to delete this Algo from your list?',
            btnCancelText: 'No, I don’t want',
            btnConfirmText: 'Yes, Delete Algo'
          };

          this.eventService.popupOpen.next(popupConfig);
          break;

        default:
          break;
      }
    }

    return false;
  }

  onAlgoTestStarted = () => {
    this.algo.Status = Status.STARTED;
    this.eventService.algoTestStarted.next();
    this.unsubscribe();
  }

  onAlgoTestStopped = () => {
    this.algo.Status = Status.STOPPED;
    this.eventService.algoTestStopped.next();
    this.unsubscribe();
  }

  onAlgoDeleteDone = () => {
    this.eventService.algoDeleteDone.next();
  }

  onAlgoDeleteError = (err: HttpErrorResponse) => {
    this.notificationService.error('Error', 'Some error occured!');
    this.unsubscribe();
  }

  onAlgoTestError = (err: HttpErrorResponse) => {
    this.notificationService.error('Error', 'Some error occured!');
    this.unsubscribe();
  }

  unsubscribe() {
    if (this.subscribeToStart) this.subscribeToStart.unsubscribe();
    if (this.subscribeToStop) this.subscribeToStop.unsubscribe();
    if (this.subscribeToDelete) this.subscribeToDelete.unsubscribe();
  }

  onPopupConfirm = (popupData) => {
    switch (popupData.name) {
      case "startAlgoWarning":
        this.subscribeToStart = this.storeService.algoStart(this.algo.Id)
        .subscribe(
          this.onAlgoTestStarted,
          this.onAlgoTestError);

        this.eventService.popupClose.next();
        break;

      case "stopAlgoWarning":
        this.subscribeToStop = this.storeService.algoStop(this.algo.Id)
        .subscribe(
          this.onAlgoTestStopped,
          this.onAlgoTestError);

        this.eventService.popupClose.next();
        break;

      case "deleteAlgoWarning":
          this.subscribeToDelete = this.storeService.algoDelete(this.algo)
          .subscribe(
            this.onAlgoDeleteDone,
            this.onAlgoDeleteError
          );
          this.eventService.popupClose.next();
        break;
    }
  }

  onPopupCancel = (popupData) => {
    this.eventService.popupClose.next();
  }
}