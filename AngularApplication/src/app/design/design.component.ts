import { Component } from '@angular/core';
import { PopupConfig } from '../models/popup.interface';
import { EventService } from '../services/event.service';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent {

  constructor() {}
}
