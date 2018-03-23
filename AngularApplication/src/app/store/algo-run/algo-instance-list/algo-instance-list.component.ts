import { Component, Input } from '@angular/core';
import { AlgoInstance } from '../../models/algo-instance.model';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from '../../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

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

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private notificationsService: NotificationsService
  ) {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.clientId = params['clientId'];
    }));
  }

  deleteInstance(instance: AlgoInstance): void {
    this.subscriptions.push(this.storeService.deleteAlgoInstance(instance).subscribe(() => {
      this.notificationsService.success('Success', 'Instance has been deleted successfully.');
      this.instancesArray = this.instancesArray.filter(
        i => (i.InstanceId !== instance.InstanceId)
      );
    }));
  }

}
