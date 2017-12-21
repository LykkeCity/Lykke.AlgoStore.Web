import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from '../../services/store.service';
import { Command } from '../../models/command.enum';
import { Status } from '../../models/status.enum';
import { Algo } from '../../models/algo.interface';
import { EventService } from '../../services/event.service';

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

    this.subscriptions.push(
      this.eventService.algoTestStarted.subscribe(this.onAlgoTestStarted),
      this.eventService.algoTestError.subscribe(this.onAlgoTestError),
    );
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  doCommand(command?: Command) {
    if (!command) {
      if (this.algo.Status === Status.DEPLOYED || this.algo.Status === Status.UNKNOWN || this.algo.Status === Status.STOPPED) {
        this.storeService.algoStart(this.algo.Id);
      } else {
        this.storeService.algoStop(this.algo.Id);
      }
    } else {
      switch (command) {
        case Command.Edit:
            this.storeService.activeAlgo = this.algo;
            this.router.navigate(['store/algo-edit']);
          break;

        case Command.Delete:
          this.storeService.algoDelete(this.algo);
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

}
