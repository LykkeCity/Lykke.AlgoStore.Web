import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlgoInstance } from '../models/algo-instance.model';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Subscription } from 'rxjs/Subscription';
import { Algo } from '../models/algo.interface';
import { Wallet } from '../../models/wallet.model';
import { UserService } from '../../services/user.service';
import { BsModalService } from 'ngx-bootstrap';
import { AlgoRunPopupComponent } from './algo-run-popup/algo-run-popup.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-algo-run',
  templateUrl: './algo-run.component.html',
  styleUrls: ['./algo-run.component.scss']
})
export class AlgoRunComponent implements OnInit, OnDestroy {

  algo: Algo = {};
  wallets: Wallet[];
  instancesArray: AlgoInstance[];
  subscriptions: Subscription[] = [];
  metadataForm: FormGroup;
  showMetadataForm = false;
  clientId: string;

  constructor(private route: ActivatedRoute,
              private storeService: StoreService,
              private userService: UserService,
              private bsModalService: BsModalService) {
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
      const algoId = params['algoId'];

      this.subscriptions.push(this.storeService.getAlgoWithSource(algoId, this.clientId).subscribe(algo => {
        this.algo = algo;
        this.algo.ClientId = this.clientId;
        this.metadataForm = this.dataToFormGroup();
        this.showMetadataForm = true;
      }));

      /*this.subscriptions.push(this.storeService.getAlgoInstances(algoId).subscribe(instances => {
        // TODO get instances here
      }));*/
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
      isDemo: true
    };
    this.bsModalService.show(AlgoRunPopupComponent, {initialState, class: 'modal-sm run-instance-popup'});
  }

  backtest(): void {

  }

  goLive(wallet: Wallet): void {
    const initialState = {
      isDemo: false,
      wallet: wallet
    };
    this.bsModalService.show(AlgoRunPopupComponent, {initialState, class: 'modal-sm run-instance-popup'});
  }

  resetDefault(): void {

  }

  deleteInstance(id: string): void {
    this.subscriptions.push(this.storeService.deleteAlgoInstance(id).subscribe(() => {
      // TODO message here
    }));
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
