import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { AlgoInstance } from '../models/algo-instance.model';
import { Subscription } from 'rxjs/Subscription';
import { Wallet } from '../../models/wallet.model';

@Component({
  selector: 'app-algo-instance',
  templateUrl: './algo-instance.component.html',
  styleUrls: ['./algo-instance.component.scss']
})
export class AlgoInstanceComponent implements OnInit {

  instance: AlgoInstance;
  clientId: string;
  wallets: Wallet[] = [];

  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private storeService: StoreService) {
    this.instance = {
      Id: 'aaa',
      Name: "My testing instance",
      Status: "Running",
      Type: "Demo",
      AlgoId: "dfsddsfsdf"
    };


    this.subscriptions.push(this.route.params.subscribe(params => {
      this.clientId = params['clientId'];
      const instanceId = params['instanceId'];
    }));
  }

  ngOnInit() {
  }

}
