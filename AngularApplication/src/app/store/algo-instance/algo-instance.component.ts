import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DATETIME_DISPLAY_FORMAT } from '../../core/utils/date-time';
import { AlgoInstance, AlgoInstanceData, IAlgoInstanceStatus, IAlgoInstanceType } from '../models/algo-instance.model';
import { Subscription, timer } from 'rxjs';
import { Wallet } from '../../models/wallet.model';
import { Algo } from '../models/algo.interface';
import { UserService } from '../../core/services/user.service';
import { BaseAlgoParam } from '../models/base-algo-param.model';
import { AlgoInstanceTrade } from '../models/algo-instance-trade.model';
import { InstanceStatistic } from '../models/algo-instance-statistic.model';
import { BsModalRef, BsModalService, TabDirective } from 'ngx-bootstrap';
import { AlgoInstancePopupComponent } from '../algo-run/algo-run-popup/algo-instance-popup.component';
import { NotificationsService } from 'angular2-notifications';
import { repeatWhen } from 'rxjs/operators';
import { PopupComponent } from '../../components/popup/popup.component';
import { PopupConfig } from '../../models/popup.interface';
import { AlgoService } from '../../core/services/algo.service';
import { InstanceService } from '../../core/services/instance.service';
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
  instanceId: string;
  algoId: string;
  algo: Algo;
  wallets: Wallet[] = [];
  trades: AlgoInstanceTrade[];
  stats: InstanceStatistic;
  log: string[] = [];
  heading = 'Log';
  hasTabLoader = false;
  interval: number;
  lastLogElement: string;

  editor: any;
  subscriptions: Subscription[] = [];
  instanceDataSubscriptions: Subscription[] = [];
  statusSub: Subscription;
  displayDateFormat = DATETIME_DISPLAY_FORMAT;

  permissions: {
    canSeeLogs: boolean,
    canSeeStatistics: boolean,
    canSeeTrades: boolean,
    canStopTest: boolean,
    canDeleteInstance: boolean,
    canEditName: boolean,
    canRestartInstance: boolean,
    canSeeWallets: boolean,
    canSeeCharts: boolean
  };

  modalRef: BsModalRef;

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
      canSeeTrades: this.userService.hasPermission(Permissions.GET_ALL_TRADES_FOR_ALGO),
      canStopTest: this.userService.hasPermission(Permissions.STOP_TEST),
      canDeleteInstance: this.userService.hasPermission(Permissions.DELETE_ALGO_INSTANCE_DATA),
      canEditName: this.userService.hasPermission(Permissions.EDIT_INSTANCE_NAME),
      canRestartInstance: false,
      canSeeWallets: this.userService.hasPermission(Permissions.GET_FREE_WALLETS),
      canSeeCharts: true
    };

    this.subscriptions.push(this.route.params.subscribe(params => {
      this.instanceId = params['instanceId'];
      this.algoId = params['algoId'];

      this.subscriptions.push(this.instanceService.getAlgoInstance(this.algoId, this.instanceId).subscribe(instance => {
        this.instance = instance;

        this.permissions.canRestartInstance = (this.instance.AlgoInstanceType === IAlgoInstanceType.Demo
          || this.instance.AlgoInstanceType === IAlgoInstanceType.Test)
          || (this.userService.hasPermission(Permissions.SAVE_ALGO_INSTANCE_DATA)
            && this.userService.hasPermission(Permissions.GET_FREE_WALLETS));

        this.subscriptions.push(this.algoService.getAlgoWithSource(this.algoId).subscribe(algo => {
          this.algo = algo;
        }));

        this.getWallets();

        if (this.instance.AlgoInstanceStatus !== IAlgoInstanceStatus.Deploying) {
          this.getInstanceData();
        } else {
          this.getStatus();
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
    if (this.modalRef) {
      this.modalRef.hide();
    }

    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });

    this.instanceDataSubscriptions.forEach(sub => {
      sub.unsubscribe();
    });

    if (this.statusSub) {
      this.statusSub.unsubscribe();
    }

    clearInterval(this.interval);
  }

  onEditorCreated(editor: any): void {
    this.editor = editor;
  }

  getWallets(): void {
    if (this.permissions.canSeeWallets) {
      this.subscriptions.push(this.userService.getFreeWallets().subscribe(wallets => {
        this.wallets = wallets;
      }));
    }
  }

  edit(): void {
    if (!this.permissions.canEditName) {
      return;
    }

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
    this.modalRef = this.bsModalService.show(AlgoInstancePopupComponent, config);
  }

  goLive(wallet: Wallet) {
    const initialState = {
      type: 'Live',
      algoInstanceData: {
        WalletId: wallet.Id,
        AlgoId: this.algo.AlgoId,
        AlgoMetaDataInformation: this.instance['AlgoMetaDataInformation'],
        AlgoInstanceType: IAlgoInstanceType.Live
      } as AlgoInstanceData,
      onInstanceCreateSuccess: () => {
        this.router.navigate(['/store/algo-run', this.algo.AlgoId]);
      }
    };
    this.modalRef = this.bsModalService.show(AlgoInstancePopupComponent, {
      initialState,
      class: 'modal-sm run-instance-popup'
    });
  }

  restartTest(): void {
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
        AlgoId: this.algo.AlgoId,
        AlgoMetaDataInformation: this.instance.AlgoMetaDataInformation,
        AlgoInstanceType: this.instance.AlgoInstanceType
      } as AlgoInstanceData,
      onSuccess: (instance) => {
        this.router.navigate(['/store/algo-run', this.algo.AlgoId]);
      }
    };
    this.modalRef = this.bsModalService.show(AlgoFakeTradingPopupComponent, {
      initialState,
      class: 'modal-sm fakeTrading-instance-popup'
    });
  }

  stopInstancePrompt(): void {
    if (!this.permissions.canStopTest) {
      return;
    }

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
    this.modalRef = this.bsModalService.show(PopupComponent, {
      initialState,
      class: 'modal-sm',
      keyboard: false,
      ignoreBackdropClick: true
    });
  }

  stopInstance(): void {
    this.subscriptions.push(
      this.instanceService.stopInstance(this.algo.AlgoId, this.instance.InstanceId).subscribe(() => {
        this.instance.AlgoInstanceStatus = IAlgoInstanceStatus.Stopped;
        this.notificationsService.success('Success', 'Instance has been stopped successfully.');
        clearInterval(this.interval);

        this.subscriptions.forEach(sub => {
          sub.unsubscribe();
        });

        this.instanceDataSubscriptions.forEach(sub => {
          sub.unsubscribe();
        });

        this.getWallets();
      }, (error) => {
        this.notificationsService.error('Error', error.DisplayMessage);
        this.modalRef.hide();
      })
    );
  }

  deleteInstancePrompt(): void {
    if (!this.permissions.canDeleteInstance) {
      return;
    }

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
    this.modalRef = this.bsModalService.show(PopupComponent, {
      initialState,
      class: 'modal-sm',
      keyboard: false,
      ignoreBackdropClick: true
    });
  }

  deleteInstance(): void {
    this.instanceService.deleteAlgoInstance(this.instance).subscribe(
      () => {
        this.notificationsService.success('Success', 'Instance has been deleted successfully.');
        this.router.navigate(['store/algo-run', this.instance.AlgoId]);
      }, (error) => {
        this.notificationsService.error('Error', error.DisplayMessage);
        this.modalRef.hide();
      }
    );
  }

  highlight(meta: BaseAlgoParam): void {
    this.editor.find(meta.Key);
    this.editor.setHighlightActiveLine(true);
  }

  getStatistics(): void {
    this.hasTabLoader = true;
    this.instanceDataSubscriptions.push(this.fetchStatisticsFromApi());

    if (this.instance.AlgoInstanceStatus !== this.iAlgoInstanceStatus.Stopped) {
      this.interval = setInterval(() => {
        this.hasTabLoader = true;
        this.instanceDataSubscriptions.push(this.fetchStatisticsFromApi());
      }, 5000);
    }
  }

  getLogs(): void {
    this.hasTabLoader = true;
    this.instanceDataSubscriptions.push(this.fetchLogsFromApi());

    if (this.instance.AlgoInstanceStatus !== this.iAlgoInstanceStatus.Stopped) {
      this.interval = setInterval(() => {
        this.hasTabLoader = true;
        this.instanceDataSubscriptions.push(this.fetchLogsFromApi());
      }, 5000);
    }
  }

  getTrades(): void {
    this.hasTabLoader = true;
    this.instanceDataSubscriptions.push(this.fetchTradesFromApi());

    if (this.instance.AlgoInstanceStatus !== this.iAlgoInstanceStatus.Stopped) {
      this.interval = setInterval(() => {
        this.hasTabLoader = true;
        this.instanceDataSubscriptions.push(this.fetchTradesFromApi());
      }, 5000);
    }
  }

  getStatus(): void {
    this.statusSub = this.instanceService.getInstanceStatus(this.instanceId)
      .pipe(
        repeatWhen(() => timer(10000, 5000))
      )
      .subscribe(
        status => {
          this.instance.AlgoInstanceStatus = status;

          if (status !== this.iAlgoInstanceStatus.Deploying) {
            this.statusSub.unsubscribe();

            this.getInstanceData();
          }
        },
        () => {
          if (this.modalRef) {
            this.modalRef.hide();
          }
        }
      );
  }

  getInstanceData(): void {
    if (this.heading === 'Statistics' && this.permissions.canSeeStatistics) {
      this.getStatistics();
    }

    if (this.heading === 'Log' && this.permissions.canSeeLogs) {
      this.getLogs();
    }

    if (this.heading === 'Trades' && this.permissions.canSeeTrades) {
      this.getTrades();
    }
  }

  onSelect(data: TabDirective) {
    this.heading = data.customClass;

    if (this.instance.AlgoInstanceStatus === IAlgoInstanceStatus.Deploying) {
      return;
    }

    clearInterval(this.interval);
    this.instanceDataSubscriptions.forEach(sub => sub.unsubscribe());
    this.instanceDataSubscriptions = []; // clear the array so we don't have duplicate subscriptions

    this.getInstanceData();
  }

  private canRestartLive(): boolean {
    return (this.instance.AlgoInstanceStatus === this.iAlgoInstanceStatus.Stopped
      || this.instance.AlgoInstanceStatus === this.iAlgoInstanceStatus.Errored)
      && this.instance.AlgoInstanceType === this.iAlgoInstanceType.Live;
  }

  private canRestartTest(): boolean {
    return (this.instance.AlgoInstanceStatus === this.iAlgoInstanceStatus.Stopped
      || this.instance.AlgoInstanceStatus === this.iAlgoInstanceStatus.Errored)
      && (this.instance.AlgoInstanceType === this.iAlgoInstanceType.Test || this.instance.AlgoInstanceType === this.iAlgoInstanceType.Demo);
  }

  private canDeleteInstance(): boolean {
    return (this.instance.AlgoInstanceStatus === this.iAlgoInstanceStatus.Stopped
      || this.instance.AlgoInstanceStatus === this.iAlgoInstanceStatus.Errored)
      && this.permissions.canDeleteInstance;
  }

  private fetchStatisticsFromApi(): Subscription {
    return this.instanceService.getInstanceStatistics(this.instanceId)
      .subscribe(
        res => {
          this.hasTabLoader = false;
          this.stats = res;
        },
        () => {
          this.hasTabLoader = false;
          if (this.modalRef) {
            this.modalRef.hide();
          }
        }
      );
  }

  private fetchLogsFromApi(): Subscription {
    return this.instanceService.getInstanceLogs(this.algoId, this.instanceId)
      .subscribe(
        res => {
          this.hasTabLoader = false;
          if (this.lastLogElement !== res.Log[0]) {
            this.log = res.Log;
            this.lastLogElement = res.Log[0];
          }
        },
        () => {
          this.hasTabLoader = false;
          if (this.modalRef) {
            this.modalRef.hide();
          }
        }
      );
  }

  private fetchTradesFromApi(): Subscription {
    return this.instanceService.getInstanceTrades(this.instanceId)
      .subscribe(
        res => {
          this.hasTabLoader = false;
          this.trades = res;
        },
        () => {
          this.hasTabLoader = false;
          if (this.modalRef) {
            this.modalRef.hide();
          }
        }
      );
  }
}
