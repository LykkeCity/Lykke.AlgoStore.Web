import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { AlgoInstance } from '../models/algo-instance.model';
import { Subscription } from 'rxjs/Subscription';
import { Wallet } from '../../models/wallet.model';
import { Algo } from '../models/algo.interface';
import { UserService } from '../../services/user.service';
import { BaseAlgoParam } from '../models/base-algo-param.model';
import { AlgoInstanceTrade, getTrades } from '../models/algo-instance-trade.model';
import { getStats, InstanceStatistic } from '../models/algo-instance-statistic.model';
import { BsModalService } from 'ngx-bootstrap';
import { AlgoInstancePopupComponent } from '../algo-run/algo-run-popup/algo-instance-popup.component';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-algo-instance',
  templateUrl: './algo-instance.component.html',
  styleUrls: ['./algo-instance.component.scss']
})
export class AlgoInstanceComponent implements OnInit, OnDestroy {

  instance: AlgoInstance;
  clientId: string;
  algo: Algo = {};
  wallets: Wallet[] = [];
  trades: AlgoInstanceTrade[];
  stats: InstanceStatistic[];

  editor: any;
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private storeService: StoreService,
              private userService: UserService,
              private bsModalService: BsModalService,
              private notificationsService: NotificationsService) {
    this.trades = getTrades();
    this.stats = getStats();
    this.instance = {
      Id: 'aaa',
      Name: 'My testing instance',
      Status: 'Running',
      Type: 'Demo',
      Date: 'Sep 14, 2017 ⋅ 21:01—21:01 CET'
    };


    this.subscriptions.push(this.route.params.subscribe(params => {
      this.clientId = params['clientId'];
      this.algo.Id = params['algoId'];
      const instanceId = params['instanceId'];

      this.subscriptions.push(this.storeService.getAlgoWithSource(this.algo.Id, this.clientId).subscribe(algo => {
        this.algo = algo;
        this.algo.ClientId = this.clientId;
      }));

      this.subscriptions.push(this.userService.getUserWalletsWithBalances().subscribe(wallets => {
        this.wallets = wallets;
      }));

      // this.subscriptions.push(this.storeService.getInstanceById(instanceId).subscribe(instance => {
      //   this.instance = instance;
      // }));
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onEditorCreated(editor: any): void {
    this.editor = editor;
  }

  edit(): void {
    const config = {
      initialState: {
        type: 'Edit',
        instanceId: this.instance.Id,
        onEditSuccess: (name) => {
          this.instance.Name = name;
          this.notificationsService.success('Success', 'Instance name has been updated.');
        }
      },
      class: 'modal-sm instance-popup'
    };
    this.bsModalService.show(AlgoInstancePopupComponent, config);
  }

  goLive(wallet: Wallet) {

  }

  stopInstance(): void {

  }

  startInstance(): void {

  }

  delete(): void {

  }

  highlight(meta: BaseAlgoParam): void {
    this.editor.find(meta.Key);
    this.editor.setHighlightActiveLine(true);
  }

}
