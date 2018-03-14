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

    this.instancesArray = [
      {
        Id: 'fafsdsdafsd',
        Name: 'My Moving Average Cross v1.0',
        Status: 'Running',
        Type: 'Demo'
      },
      {
        Id: 'aaaaaa',
        Name: 'My Moving Average Cross v2.0',
        Status: 'Stopped',
        Type: 'Live'
      },
      {
        Id: 'bbbbbb',
        Name: 'My Moving Average Cross v3.0',
        Status: 'Live',
        Type: 'Running'
      },
    ];

    this.subscriptions.push(this.route.params.subscribe(params => {
      this.clientId = params['clientId'];
    }));

    /*this.subscriptions.push(this.storeService.getAlgoInstances(algoId).subscribe(instances => {
      // TODO get instances here
    }));*/

  }

  ngOnInit() {
    console.log(this.instancesArray);
  }

  deleteInstance(id: string): void {
    this.subscriptions.push(this.storeService.deleteAlgoInstance(id).subscribe(() => {
      // TODO message here
    }));
  }

}
