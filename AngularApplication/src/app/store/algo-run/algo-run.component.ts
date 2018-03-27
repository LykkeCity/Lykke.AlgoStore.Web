import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Algo } from '../models/algo.interface';
import { Wallet } from '../../models/wallet.model';
import { UserService } from '../../services/user.service';
import { BsModalService } from 'ngx-bootstrap';
import { AlgoInstancePopupComponent } from './algo-run-popup/algo-instance-popup.component';
import { FormControl, FormGroup } from '@angular/forms';
import { AlgoInstance, AlgoInstanceData, IAlgoInstanceType } from '../models/algo-instance.model';
import { AlgoService } from '../../services/algo.service';
import { InstanceService } from '../../services/instance.service';

@Component({
  selector: 'app-algo-run',
  templateUrl: './algo-run.component.html',
  styleUrls: ['./algo-run.component.scss']
})
export class AlgoRunComponent implements OnInit, OnDestroy {

  algo: Algo;
  wallets: Wallet[];
  subscriptions: Subscription[] = [];
  instancesArray: AlgoInstance[];
  metadataForm: FormGroup;
  showMetadataForm = false;
  clientId: string;

  constructor(private route: ActivatedRoute,
              private algoService: AlgoService,
              private instanceService: InstanceService,
              private userService: UserService,
              private bsModalService: BsModalService) {

    this.subscriptions.push(this.route.params.subscribe(params => {
      this.clientId = params['clientId'];
      const algoId = params['algoId'];

      this.subscriptions.push(this.algoService.getAlgoWithSource(algoId, this.clientId).subscribe(algo => {
        this.algo = algo;
        this.algo.ClientId = this.clientId;
        this.metadataForm = this.dataToFormGroup();
        this.showMetadataForm = true;
      }));

      this.subscriptions.push(this.instanceService.getAlgoInstances(algoId).subscribe(instances => {
        this.instancesArray = instances;
      }));
    }));

    this.subscriptions.push(this.userService.getUserWalletsWithBalances().subscribe(wallets => {
      this.wallets = wallets;
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  runDemo(): void {
    const initialState = {
      type: 'Demo'
    };
    this.bsModalService.show(AlgoInstancePopupComponent, {initialState, class: 'modal-sm run-instance-popup'});
  }

  backtest(): void {

  }

  goLive(wallet: Wallet): void {
    this.mapFormToData();
    const initialState = {
      type: 'Live',
      algoInstanceData: {
        WalletId: wallet.Id,
        AlgoClientId: this.clientId,
        AlgoId: this.algo.AlgoId,
        AlgoMetadataInformation: this.algo.AlgoMetaDataInformation,
        AlgoInstanceType: IAlgoInstanceType.Live
      } as AlgoInstanceData,
      onInstanceCreateSuccess: (instance) => {
        this.instancesArray.push(instance);
      }
    };
    this.bsModalService.show(AlgoInstancePopupComponent, {initialState, class: 'modal-sm run-instance-popup'});
  }

  resetDefault(): void {

  }

  dataToFormGroup() {

    const parametersGroup = new FormGroup({});
    const functionsGroup = new FormGroup({});

    this.algo.AlgoMetaDataInformation.Parameters.forEach(
      value => {
        parametersGroup.addControl(value.Key, new FormControl(value.Value || ''));
      }
    );

    this.algo.AlgoMetaDataInformation.Functions.forEach(
      fn => {
        let fnGroup: FormGroup;
        functionsGroup.addControl(fn.Id, new FormGroup({}));
        fnGroup = functionsGroup.get(fn.Id) as FormGroup;
        fn.Parameters.forEach(
          param => {
            fnGroup.addControl(param.Key, new FormControl(param.Value || ''));
          }
        );
      }
    );

    return new FormGroup({Parameters: parametersGroup, Functions: functionsGroup});

  }

  mapFormToData() {
    const formValue = this.metadataForm.value;

    this.algo.AlgoMetaDataInformation.Parameters.forEach(
      param => param.Value = formValue.Parameters[param.Key]
    );

    this.algo.AlgoMetaDataInformation.Functions.forEach(
      func => {
        func.Parameters.forEach(
          funcParam => funcParam.Value = formValue.Functions[func.Id][funcParam.Key]
        );
      }
    );
  }

}
