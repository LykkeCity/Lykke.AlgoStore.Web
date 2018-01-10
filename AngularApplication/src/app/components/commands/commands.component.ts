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
    private router: Router) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  doCommand(command?: Command) {
    if (command) {
     
      switch (command) {
        case Command.Edit:
          this.storeService.activeAlgo = this.algo;
          this.router.navigate(['store/algo-edit']);
          break;

        default:
          break;
      }
    }

    return false;
  }
}