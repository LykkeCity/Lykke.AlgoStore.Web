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

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit, OnDestroy {

  @Input() algo: Algo;

  Command: any = Command;
  Status: any = Status;

  private subscriptions: Subscription[] = [];

  constructor(
    private storeService: StoreService,
    private eventService: EventService,
    private notificationService: NotificationsService,
    private router: Router) {

  }

  ngOnInit() {
    this.subscriptions.push(
      this.eventService.algoTestStarted.subscribe(this.onAlgoTestStarted),
      this.eventService.algoTestError.subscribe(this.onAlgoTestError),
      this.eventService.popupConfirm.subscribe(this.onPopupConfirm),
      this.eventService.popupCancel.subscribe(this.onPopupCancel),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  doCommand(command?: Command) {
    if (!command) {
      if (this.algo.Status === Status.DEPLOYED || this.algo.Status === Status.UNKNOWN || this.algo.Status === Status.STOPPED) {
        const popupConfig: PopupConfig = {
          hideIcon: true,
          data: { algoId: this.algo.Id },
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
          data: { algoId: this.algo.Id },
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

  onAlgoTestStarted = (status: Status) => {
    this.algo.Status = status;
    console.log(status);
  }

  onAlgoTestError = () => {
    this.notificationService.error('Error', 'Some error occured!');
    console.log('AlgoTestError');
  }


  onPopupConfirm = (popupData) => {
    switch (popupData.name) {
      case "startAlgoWarning":
        if (popupData.data.algoId == this.algo.Id) {
          this.storeService.algoStart(this.algo.Id);
          this.eventService.popupClose.next();
        }
        break;

      case "stopAlgoWarning":
        if (popupData.data.algoId == this.algo.Id) {
          this.storeService.algoStop(this.algo.Id);
          this.eventService.popupClose.next();
        }
        break;

      case "deleteAlgoWarning":
        if (popupData.data.algoId == this.algo.Id) {
          this.storeService.algoDelete(this.algo);
          this.eventService.popupClose.next();
        }
        break;
    }
  }

  onPopupCancel = (popupData) => {
    this.eventService.popupClose.next();
  }

}
