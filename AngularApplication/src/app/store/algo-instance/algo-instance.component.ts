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

    this.subscriptions.push(this.route.params.subscribe(params => {
      this.subscriptions.push(this.storeService.getAlgoWithSource(params['algoId'], params['clientId']).subscribe(algo => {
        this.algo = {...algo, ClientId: params['clientId']};
      }));

      this.subscriptions.push(this.userService.getUserWalletsWithBalances().subscribe(wallets => {
        this.wallets = wallets;
      }));

      this.subscriptions.push(this.storeService.getAlgoInstance(params['algoId'], params['instanceId']).subscribe(instance => {
        this.instance = {...instance, Status: 'Running', Type: 'Live', Date: 'Sep 14, 2017 ⋅ 21:01—21:01 CET'};
        // TODO: remove hardcoded status, type and date once it's implemented in the backend
      }));
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
        instanceId: this.instance.InstanceId,
        onEditSuccess: (name) => {
          this.instance.InstanceName = name;
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

    this.subscriptions.push(
      this.storeService.algoStop(this.algo.AlgoId, this.instance.InstanceId, this.algo.ClientId).subscribe(() => {
        this.notificationsService.success('Success', 'Instance has been stopped successfully.');
      })
    );

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
