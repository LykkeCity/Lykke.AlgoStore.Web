import { Component, Input, OnInit } from '@angular/core';
import { AlgoInstance } from '../../models/algo-instance.model';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from '../../../services/store.service';
import { Algo } from '../../models/algo.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-algo-instance-list',
  templateUrl: './algo-instance-list.component.html',
  styleUrls: ['./algo-instance-list.component.scss']
})
export class AlgoInstanceListComponent implements OnInit {

  @Input() algo: Algo;
  instancesArray: AlgoInstance[];
  subscriptions: Subscription[] = [];
  clientId: string;

  constructor(private route: ActivatedRoute, private storeService: StoreService) {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.clientId = params['clientId'];
    }));
  }

  ngOnInit() {
    this.subscriptions.push(this.storeService.getAlgoInstances(this.algo.AlgoId).subscribe(instances => {
      this.instancesArray = instances
        .map(instance => ({...instance, Status: 'Running', Type: 'Live', Date: 'Sep 14, 2017 ⋅ 21:01—21:01 CET'}));
      // TODO: remove hardcoded status, type and date once it's implemented in the backend
    }));
  }

  deleteInstance(id: string): void {
    this.subscriptions.push(this.storeService.deleteAlgoInstance(id).subscribe(() => {
      // TODO message here
    }));
  }

}
