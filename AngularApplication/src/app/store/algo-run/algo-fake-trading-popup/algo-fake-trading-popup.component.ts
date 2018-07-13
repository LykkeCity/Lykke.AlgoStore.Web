import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { InstanceService } from '../../../services/instance.service';
import { AlgoInstanceData, IAlgoInstanceType } from '../../models/algo-instance.model';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-algo-fake-trading-popup',
  templateUrl: './algo-fake-trading-popup.component.html',
  styleUrls: ['./algo-fake-trading-popup.component.scss']
})
export class AlgoFakeTradingPopupComponent implements OnDestroy {

  algoInstanceForm: FormGroup;
  iAlgoInstanceType = IAlgoInstanceType;
  tradeAsset: string;
  assetTwo: string;
  onSuccess: Function;
  algoInstanceData: AlgoInstanceData;
  subscriptions: Subscription[] = [];
  loader = false;

  constructor(private fb: FormBuilder,
              public modalRef: BsModalRef,
              private instanceService: InstanceService,
              private notificationsService: NotificationsService) {
    this.algoInstanceForm = this.fb.group({
      InstanceName: ['', { validators: [Validators.required], updateOn: 'submit' }],
      FakeTradingTradingAssetBalance: ['', { validators: [Validators.required, Validators.min(0)], updateOn: 'submit' }],
      FakeTradingAssetTwoBalance: ['', { validators: [Validators.required, Validators.min(0)], updateOn: 'submit' }]
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onSubmit(): void {
    this.algoInstanceForm.markAsDirty();
    if (!this.algoInstanceForm.valid) {
      return;
    }

    this.loader = true;

    const fakeTradingData = {
      ...this.algoInstanceData,
      ...this.algoInstanceForm.value,
      AlgoMetaDataInformation: JSON.parse(JSON.stringify(this.algoInstanceData.AlgoMetaDataInformation))
    };

    fakeTradingData.AlgoMetaDataInformation.Parameters.forEach(param => {
      delete param.PredefinedValues;
    });

    fakeTradingData.AlgoMetaDataInformation.Functions.forEach(func => {
      func.Parameters.forEach(param => {
        delete param.PredefinedValues;
      });
    });

    this.subscriptions.push(this.instanceService.fakeTrading(fakeTradingData).subscribe((data) => {
      this.notificationsService.success('Success', 'Instance created successfully.');
      this.modalRef.hide();
      this.onSuccess(data);
    }, (error) => {
      this.notificationsService.error('Error', error.DisplayMessage);
      this.modalRef.hide();
    }));
  }

}
