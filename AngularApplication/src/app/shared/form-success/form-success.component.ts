import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../services/event.service';
import { SuccessMessageConfig } from '../../models/successConfig.interface';

@Component({
  selector: 'app-form-success',
  templateUrl: './form-success.component.html',
  styleUrls: ['./form-success.component.scss']
})
export class FormSuccessComponent implements OnInit, OnDestroy {
  _showMessage: boolean;
  messageConfig: SuccessMessageConfig;

  private subscriptions: Subscription[] = [];

  constructor(private eventService: EventService,
              private location: Location) {
    this._showMessage = false;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.eventService.successShow.subscribe(this.onMessageOpen),
      this.eventService.successHide.subscribe(this.onMessageClose),
    );
  }

  ngOnDestroy() {
    this.onMessageClose();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onMessageOpen = (data: SuccessMessageConfig) => {
    this.messageConfig = data;
    this._showMessage = true;
  }

  onMessageClose = () => {
    this.messageConfig = null;
    this._showMessage = false;
  }

  onLocationBack() {
    this.location.back();
  }
}
