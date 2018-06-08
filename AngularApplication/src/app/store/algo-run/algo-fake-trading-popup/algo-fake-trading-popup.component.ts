import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { InstanceService } from '../../../services/instance.service';
import { AlgoInstanceData, IAlgoInstanceType } from '../../models/algo-instance.model';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-algo-fake-trading-popup',
  templateUrl: './algo-fake-trading-popup.component.html',
  styleUrls: ['./algo-fake-trading-popup.component.scss']
})
export class AlgoFakeTradingPopupComponent implements OnInit {

  algoInstanceForm: FormGroup;
  iAlgoInstanceType = IAlgoInstanceType;
  tradeAsset: string;
  assetTwo: string;
  onSuccess: Function;
  algoInstanceData: AlgoInstanceData;
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
              public modalRef: BsModalRef,
              private instanceService: InstanceService,
              private notificationsService: NotificationsService) {
    this.algoInstanceForm = this.fb.group({
      InstanceName: ['', { validators: [Validators.required], updateOn: 'submit'}],
      FakeTradingTradingAssetBalance: ['', {validators: [Validators.required, Validators.min(0)], updateOn: 'submit'}],
      FakeTradingAssetTwoBalance: ['', {validators: [Validators.required, Validators.min(0)], updateOn: 'submit'}]
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.algoInstanceForm.markAsDirty();
    if (!this.algoInstanceForm.valid) {
      return;
    }

    const backtestData = {...this.algoInstanceData, ...this.algoInstanceForm.value};

    this.instanceService.fakeTrading(backtestData).subscribe((data) => {
      this.subscriptions.push(this.instanceService.algoDeploy(this.algoInstanceData.AlgoClientId, data.AlgoId, data.InstanceId)
        .subscribe(() => {
          this.notificationsService.success('Success', 'Instance created successfully.');
          this.modalRef.hide();
          this.onSuccess(data);
        }, () => {
          this.notificationsService.error('Error', 'There was an error while running your instance.');
          this.modalRef.hide();
        }));
    });
  }

}
