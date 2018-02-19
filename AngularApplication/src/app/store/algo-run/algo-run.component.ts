import { Component, OnInit } from '@angular/core';
import { AlgoInstance } from '../models/algo-instance.model';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Subscription } from 'rxjs/Subscription';
import { Algo } from '../models/algo.interface';
import { Wallet } from '../../models/wallet.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-algo-run',
  templateUrl: './algo-run.component.html',
  styleUrls: ['./algo-run.component.scss']
})
export class AlgoRunComponent implements OnInit {

  algo: Algo = {};
  wallets: Wallet[];
  instancesArray: AlgoInstance[];
  routerSubscription: Subscription;

  constructor(private route: ActivatedRoute, private storeService: StoreService, private userService: UserService) {
    this.instancesArray = [
      {
        Name: "My Moving Average Cross v1.0",
        Status: "Running",
        Type: "Demo"
      },
      {
        Name: "My Moving Average Cross v2.0",
        Status: "Stopped",
        Type: "Live"
      },
      {
        Name: "My Moving Average Cross v3.0",
        Status: "Live",
        Type: "Running"
      },
    ];

    this.routerSubscription = this.route.params.subscribe(params => {
      const clientId = params['clientId'];
      const algoId = params['algoId'];

      this.storeService.getAlgoWithSource(algoId, clientId).subscribe(algo => {
        this.algo = algo;
        this.algo.ClientId = clientId;
      });
    });

    this.userService.getUserWallets().subscribe(wallets => {
      this.wallets = wallets;
    });
  }

  ngOnInit() {
  }

  runDemo(): void {

  }

  backtest(): void {

  }

  goLive(): void {

  }

  resetDefault(): void {

  }

  deleteInstance(): void {

  }

}
