import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlgoInstance, AlgoInstanceData, IAlgoInstanceStatus, IAlgoInstanceType } from '../models/algo-instance.model';
import { Subscription } from 'rxjs/Subscription';
import { Wallet } from '../../models/wallet.model';
import { Algo } from '../models/algo.interface';
import { UserService } from '../../services/user.service';
import { BaseAlgoParam } from '../models/base-algo-param.model';
import { AlgoInstanceTrade } from '../models/algo-instance-trade.model';
import { InstanceStatistic } from '../models/algo-instance-statistic.model';
import { BsModalService } from 'ngx-bootstrap';
import { AlgoInstancePopupComponent } from '../algo-run/algo-run-popup/algo-instance-popup.component';
import { NotificationsService } from 'angular2-notifications';
import { repeatWhen } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { PopupComponent } from '../../components/popup/popup.component';
import { PopupConfig } from '../../models/popup.interface';
import { AlgoService } from '../../services/algo.service';
import { InstanceService } from '../../services/instance.service';
import Permissions from '../models/permissions';
import { AlgoFakeTradingPopupComponent } from '../algo-run/algo-fake-trading-popup/algo-fake-trading-popup.component';

@Component({
  selector: 'app-algo-instance',
  templateUrl: './algo-instance.component.html',
  styleUrls: ['./algo-instance.component.scss']
})
export class AlgoInstanceComponent implements OnDestroy {
  iAlgoInstanceStatus = IAlgoInstanceStatus;
  iAlgoInstanceType = IAlgoInstanceType;
  instance: AlgoInstance;
  clientId: string;
  instanceId: string;
  algoId: string;
  algo: Algo = {};
  wallets: Wallet[] = [];
  trades: AlgoInstanceTrade[];
  stats: InstanceStatistic;
  log: string[] = [];

  editor: any;
  subscriptions: Subscription[] = [];

  permissions: {
    canSeeLogs: boolean,
    canSeeStatistics: boolean,
    canSeeTrades: boolean
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private algoService: AlgoService,
              private instanceService: InstanceService,
              private userService: UserService,
              private bsModalService: BsModalService,
              private notificationsService: NotificationsService) {


    this.permissions = {
      canSeeLogs: this.userService.hasPermission(Permissions.GET_TEST_TAIL_LOG),
      canSeeStatistics: this.userService.hasPermission(Permissions.GET_ALGO_INSTANCE_STATISTIC),
      canSeeTrades: this.userService.hasPermission(Permissions.GET_ALL_TRADES_FOR_ALGO)
    };

    this.subscriptions.push(this.route.params.subscribe(params => {
      this.clientId = params['clientId'];
      this.instanceId = params['instanceId'];
      this.algoId = params['algoId'];

      this.subscriptions.push(this.instanceService.getAlgoInstance(this.algoId, this.instanceId).subscribe(instance => {
        this.instance = instance;

        this.subscriptions.push(this.algoService.getAlgoWithSource(this.algoId, this.clientId).subscribe(algo => {
          this.algo = { ...algo, ClientId: this.clientId };
        }));

        this.subscriptions.push(this.userService.getUserWalletsWithBalances().subscribe(wallets => {
          this.wallets = wallets;
        }));

        if (this.instance.AlgoInstanceStatus !== IAlgoInstanceStatus.Deploying) {
          if (this.permissions.canSeeLogs) {
            this.subscriptions.push(this.getLogs());
          } else if (this.permissions.canSeeStatistics) {
            this.subscriptions.push(this.getStatistics());
          } else if (this.permissions.canSeeTrades) {
            this.subscriptions.push(this.getTrades());
          }
        }
      }, (err) => {
        if (err.status === 404) {
          this.notificationsService.error('Error', 'Instance does not exist.');
          this.router.navigate(['/store/algo-list']);
        }
      }));
    }));
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
    const initialState = {
      type: 'Live',
      algoInstanceData: {
        WalletId: wallet.Id,
        AlgoClientId: this.clientId,
        AlgoId: this.algo.AlgoId,
        AlgoMetaDataInformation: this.instance['AlgoMetaDataInformation'],
        AlgoInstanceType: IAlgoInstanceType.Live
      } as AlgoInstanceData,
      onInstanceCreateSuccess: () => {
        this.router.navigate(['/store/algo-run', this.clientId, this.algo.AlgoId]);
      }
    };
    this.bsModalService.show(AlgoInstancePopupComponent, { initialState, class: 'modal-sm run-instance-popup' });
  }

  backtest(): void {
    const assetPair = this.instance.AlgoMetaDataInformation.Parameters.find(param => param.Key === 'AssetPair').Value;
    const tradedAsset = this.instance.AlgoMetaDataInformation.Parameters.find(param => param.Key === 'TradedAsset').Value;
    let assetTwoName = '';

    if (assetPair.indexOf(tradedAsset) === 0) {
      assetTwoName = assetPair.substr(tradedAsset.indexOf(tradedAsset[tradedAsset.length - 1]) + 1);
    } else {
      assetTwoName = assetPair.substr(0, assetPair.indexOf(tradedAsset));
    }

    const initialState = {
      tradeAsset: tradedAsset,
      assetTwo: assetTwoName,
      algoInstanceData: {
        AlgoClientId: this.clientId,
        AlgoId: this.algo.AlgoId,
        AlgoMetaDataInformation: this.instance.AlgoMetaDataInformation,
        AlgoInstanceType: IAlgoInstanceType.Test
      } as AlgoInstanceData,
      onSuccess: (instance) => {
        this.router.navigate(['/store/algo-run', this.clientId, this.algo.AlgoId]);
      }
    };
    this.bsModalService.show(AlgoFakeTradingPopupComponent, { initialState, class: 'modal-sm fakeTrading-instance-popup' });
  }

  stopInstancePrompt(): void {
    const initialState = {
      popupConfig: {
        title: 'Stop instance',
        text: `Are you sure you want to stop ${this.instance.InstanceName}?`,
        btnCancelText: 'Cancel',
        btnConfirmText: 'Stop',
        successCallback: () => {
          this.stopInstance();
        }
      } as PopupConfig
    };
    this.bsModalService.show(PopupComponent, { initialState, class: 'modal-sm', keyboard: false, ignoreBackdropClick: true });
  }

  stopInstance(): void {
    this.subscriptions.push(
      this.instanceService.algoStop(this.algo.AlgoId, this.instance.InstanceId, this.algo.ClientId).subscribe(() => {
        this.instance.AlgoInstanceStatus = IAlgoInstanceStatus.Stopped;
        this.notificationsService.success('Success', 'Instance has been stopped successfully.');
        this.subscriptions.forEach(sub => {
          sub.unsubscribe();
        });
      })
    );
  }

  deleteInstancePrompt(): void {
    const initialState = {
      popupConfig: {
        title: 'Delete instance',
        text: `Are you sure you want to delete ${this.instance.InstanceName}?`,
        btnCancelText: 'Cancel',
        btnConfirmText: 'Delete',
        successCallback: () => {
          this.deleteInstance();
        }
      } as PopupConfig
    };
    this.bsModalService.show(PopupComponent, { initialState, class: 'modal-sm', keyboard: false, ignoreBackdropClick: true });
  }

  deleteInstance(): void {
    this.instanceService.deleteAlgoInstance(this.instance).subscribe(
      () => {
        this.notificationsService.success('Success', 'Instance has been deleted successfully.');
        this.router.navigate(['store/algo-run', this.instance.AlgoClientId, this.instance.AlgoId]);
      }
    );
  }

  highlight(meta: BaseAlgoParam): void {
    this.editor.find(meta.Key);
    this.editor.setHighlightActiveLine(true);
  }

  getStatistics(): Subscription {
    return this.instanceService.algoGetStatistics(this.instanceId)
      .pipe(
        repeatWhen(() => timer(10000, 5000))
      )
      .subscribe(
        res => {
          this.stats = res;
        }
      );
  }

  getLogs(): Subscription {
    return this.instanceService.algoGetTailLog(this.algoId, this.instanceId, this.clientId)
      .pipe(
        repeatWhen(() => timer(10000, 5000))
      )
      .subscribe(
        res => {
          if (this.log.length !== res.Log.length) {
            this.log = res.Log;
          }
        }
      );
  }

  getTrades(): Subscription {
    return this.instanceService.algoGetTrades(this.instanceId)
      .pipe(
        repeatWhen(() => timer(10000, 5000))
      )
      .subscribe(
        res => {
          this.trades = res;
        }
      );
  }

  onSelect(event) {
    if (this.instance.AlgoInstanceStatus === IAlgoInstanceStatus.Deploying) {
      return;
    }

    const heading = event.heading;
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = []; // clear the array so we don't have duplicate subscriptions

    if (heading === 'Statistics' && this.permissions.canSeeStatistics) {
      this.subscriptions.push(this.getStatistics());
    }

    if (heading === 'Log' && this.permissions.canSeeLogs) {
      this.subscriptions.push(this.getLogs());
    }

    if (heading === 'Trades' && this.permissions.canSeeTrades) {
      this.subscriptions.push(this.getTrades());
    }
  }
}
