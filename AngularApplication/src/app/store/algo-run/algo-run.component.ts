import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Algo, AlgoVisibility } from '../models/algo.interface';
import { Wallet } from '../../models/wallet.model';
import { UserService } from '../../core/services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AlgoInstancePopupComponent } from './algo-run-popup/algo-instance-popup.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlgoInstance, AlgoInstanceData, IAlgoInstanceType } from '../models/algo-instance.model';
import { AlgoService } from '../../core/services/algo.service';
import { InstanceService } from '../../core/services/instance.service';
import Permissions from '../models/permissions';
import { AlgoFakeTradingPopupComponent } from './algo-fake-trading-popup/algo-fake-trading-popup.component';
import DateTime from '../../core/utils/date-time';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-algo-run',
  templateUrl: './algo-run.component.html',
  styleUrls: ['./algo-run.component.scss']
})
export class AlgoRunComponent implements OnDestroy {

  algo: Algo;
  wallets: Wallet[];
  subscriptions: Subscription[] = [];
  instancesArray: AlgoInstance[];
  metadataForm: FormGroup;
  iAlgoVisibility = AlgoVisibility;
  iAlgoInstanceType = IAlgoInstanceType;
  showMetadataForm = false;
  permissions: {
    canRunInstance: boolean,
    canSeeInstances: boolean,
    canRunFakeTrading: boolean,
    isCurrentUser: boolean,
    canSeeWallets: boolean
  };

  modalRef: BsModalRef;

  constructor(private route: ActivatedRoute,
              private algoService: AlgoService,
              private instanceService: InstanceService,
              private userService: UserService,
              private bsModalService: BsModalService,
              private notificationsService: NotificationsService) {

    this.permissions = {
      canRunInstance: this.userService.hasPermission(Permissions.SAVE_ALGO_INSTANCE_DATA)
      && this.userService.hasPermission(Permissions.GET_FREE_WALLETS),
      canSeeInstances: this.userService.hasPermission(Permissions.GET_ALL_ALGO_INSTANCE_DATA),
      canRunFakeTrading: this.userService.hasPermission(Permissions.RUN_FAKE_TRADE),
      isCurrentUser: false,
      canSeeWallets: this.userService.hasPermission(Permissions.GET_FREE_WALLETS)
    };

    this.subscriptions.push(this.route.params.subscribe(params => {
      const algoId = params['algoId'];

      // this.algoService.isAuthor(algoId).subscribe(isAuthor => {
      //   this.permissions.isCurrentUser = isAuthor;
      // });

      this.subscriptions.push(this.algoService.getAlgoWithSource(algoId).subscribe(algo => {
        this.algo = algo;

        const assetPair = this.algo.AlgoMetaDataInformation.Parameters.find(p => p.Key === 'AssetPair');

        if (assetPair.Value) {
          this.algoService.getAssetsByAssetPair(assetPair.Value).subscribe((assets) => {
            this.algo.AlgoMetaDataInformation.Parameters.find(p => p.Key === 'TradedAsset').PredefinedValues = assets;

            this.metadataForm = this.dataToFormGroup();
            this.showMetadataForm = true;
          });
        } else {
          this.metadataForm = this.dataToFormGroup();
          this.metadataForm.controls['Parameters']['controls']['TradedAsset'].disable();
          this.showMetadataForm = true;
        }
      }));

      if (this.permissions.canSeeInstances) {
        this.subscriptions.push(this.instanceService.getAlgoInstances(algoId).subscribe(instances => {
          this.instancesArray = instances;
        }));
      }

    }));

    this.getWallets();
  }

  ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.hide();
    }

    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  getWallets(): void {
    if (this.permissions.canSeeWallets) {
      this.subscriptions.push(this.userService.getFreeWallets().subscribe(wallets => {
        this.wallets = wallets;
      }));
    }
  }

  fakeTrading(instanceType: IAlgoInstanceType): void {
    if (!this.permissions.canRunFakeTrading) {
      return;
    }

    if (this.metadataForm.invalid) {
      this.notificationsService.error('Error', 'All Metadata Attributes should be populated before running an instance', { timeOut: 3000 });
      return;
    }

    this.mapFormToData();
    const assetPair = this.algo.AlgoMetaDataInformation.Parameters.find(param => param.Key === 'AssetPair').Value;
    const tradedAsset = this.algo.AlgoMetaDataInformation.Parameters.find(param => param.Key === 'TradedAsset').Value;
    let assetTwoName = '';

    if (assetPair.indexOf(tradedAsset) === 0) {
      assetTwoName = assetPair.substr(tradedAsset.indexOf(tradedAsset[tradedAsset.length - 1]) + 1);
    } else {
      assetTwoName = assetPair.substr(0, assetPair.indexOf(tradedAsset));
    }

    if (!assetTwoName) {
      this.notificationsService.error('Error', 'Your AssetPair and TradedAsset do not match');
      return;
    }

    const initialState = {
      tradeAsset: tradedAsset,
      assetTwo: assetTwoName,
      algoInstanceData: {
        AlgoId: this.algo.AlgoId,
        AlgoMetaDataInformation: this.algo.AlgoMetaDataInformation,
        AlgoInstanceType: instanceType
      } as AlgoInstanceData,
      onSuccess: (instance) => {
        this.instancesArray.push(instance);
        this.instancesArray = [...this.instancesArray];
      }
    };
    this.modalRef = this.bsModalService.show(AlgoFakeTradingPopupComponent, { initialState, class: 'modal-sm fakeTrading-instance-popup' });
  }

  goLive(wallet: Wallet): void {
    if (!this.permissions.canRunInstance) {
      return;
    }

    if (this.metadataForm.invalid) {
      this.notificationsService.error('Error', 'All Metadata Attributes should be populated before running an instance', { timeOut: 3000 });
      return;
    }

    this.mapFormToData();

    const assetPair = this.algo.AlgoMetaDataInformation.Parameters.find(param => param.Key === 'AssetPair').Value;
    const tradedAsset = this.algo.AlgoMetaDataInformation.Parameters.find(param => param.Key === 'TradedAsset').Value;

    if (assetPair.indexOf(tradedAsset) === -1) {
      this.notificationsService.error('Error', 'Your AssetPair and TradedAsset do not match');
      return;
    }

    const initialState = {
      type: 'Live',
      algoInstanceData: {
        WalletId: wallet.Id,
        AlgoId: this.algo.AlgoId,
        AlgoMetaDataInformation: this.algo.AlgoMetaDataInformation,
        AlgoInstanceType: IAlgoInstanceType.Live
      } as AlgoInstanceData,
      onInstanceCreateSuccess: (instance) => {
        this.instancesArray.push(instance);
        this.instancesArray = [...this.instancesArray];
        const index = this.wallets.findIndex(w => w.Id === wallet.Id);
        if (index !== -1) {
          this.wallets.splice(index, 1);
        }
      }
    };
    this.modalRef = this.bsModalService.show(AlgoInstancePopupComponent, { initialState, class: 'modal-sm run-instance-popup' });
  }

  resetDefault(): void {

  }

  onAssetPairChange(data): void {
    const tradedAssetControl = this.metadataForm.controls['Parameters']['controls']['TradedAsset'];

    tradedAssetControl.disable();

    if (!data.assetPair) {
      tradedAssetControl.reset();
      return;
    }

    this.algoService.getAssetsByAssetPair(data.assetPair.Value).subscribe((assets) => {
      this.algo.AlgoMetaDataInformation.Parameters.find(p => p.Key === 'TradedAsset').PredefinedValues = assets;
      tradedAssetControl.reset();
      tradedAssetControl.enable();
    });
  }

  dataToFormGroup() {

    const parametersGroup = new FormGroup({});
    const functionsGroup = new FormGroup({});

    this.algo.AlgoMetaDataInformation.Parameters.forEach(
      value => {
        parametersGroup.addControl(value.Key, new FormControl(value.Value || '', [Validators.required]));
      }
    );

    this.algo.AlgoMetaDataInformation.Functions.forEach(
      fn => {
        let fnGroup: FormGroup;
        functionsGroup.addControl(fn.Id, new FormGroup({}));
        fnGroup = functionsGroup.get(fn.Id) as FormGroup;
        fn.Parameters.forEach(
          param => {
            fnGroup.addControl(param.Key, new FormControl(param.Value || '', [Validators.required]));
          }
        );
      }
    );

    return new FormGroup({ Parameters: parametersGroup, Functions: functionsGroup });

  }

  mapFormToData() {
    const formValue = this.metadataForm.value;

    this.algo.AlgoMetaDataInformation.Parameters.forEach(param => {
      if (param.Type === 'System.DateTime') {
        param.Value = DateTime.toISO(formValue.Parameters[param.Key]);
      } else {
       param.Value = formValue.Parameters[param.Key];
      }
    });

    this.algo.AlgoMetaDataInformation.Functions.forEach(func => {
      func.Parameters.forEach(funcParam => {
        if (funcParam.Type === 'System.DateTime') {
         funcParam.Value = DateTime.toISO(formValue.Functions[func.Id][funcParam.Key]);
        } else {
         funcParam.Value = formValue.Functions[func.Id][funcParam.Key];
        }
      });
    });
  }

  canRunFakeTrading(): boolean {
    return this.permissions.canRunFakeTrading &&
      (this.algo.AlgoVisibility === this.iAlgoVisibility.Public || this.permissions.isCurrentUser);
  }

  canRunLiveTrading(): boolean {
    return this.permissions.canRunInstance &&
      (this.algo.AlgoVisibility === this.iAlgoVisibility.Public || this.permissions.isCurrentUser);
  }

  onInstanceDelete(event: any): void {
    this.getWallets();
  }

}
