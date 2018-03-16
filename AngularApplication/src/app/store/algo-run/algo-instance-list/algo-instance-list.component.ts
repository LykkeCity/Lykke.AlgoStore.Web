import { Component, Input } from '@angular/core';
import { AlgoInstance } from '../../models/algo-instance.model';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from '../../../services/store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-algo-instance-list',
  templateUrl: './algo-instance-list.component.html',
  styleUrls: ['./algo-instance-list.component.scss']
})
export class AlgoInstanceListComponent {

  @Input() algoId: string;
  @Input() instancesArray: AlgoInstance[];
  subscriptions: Subscription[] = [];
  clientId: string;

  constructor(private route: ActivatedRoute, private storeService: StoreService) {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.clientId = params['clientId'];
    }));
  }

  deleteInstance(id: string): void {
    this.subscriptions.push(this.storeService.deleteAlgoInstance(id).subscribe(() => {
      // TODO message here
    }));
  }

}
