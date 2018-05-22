import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { InstanceService } from '../../../services/instance.service';
import { AlgoInstanceData } from '../../models/algo-instance.model';
import { IDatePickerConfig } from 'ng2-date-picker';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-algo-backtest-popup',
  templateUrl: './algo-backtest-popup.component.html',
  styleUrls: ['./algo-backtest-popup.component.scss']
})
export class AlgoBacktestPopupComponent implements OnInit {

  algoInstanceForm: FormGroup;
  tradeAsset: string;
  assetTwo: string;
  onSuccess: Function;
  algoInstanceData: AlgoInstanceData;
  dpConfig: IDatePickerConfig;
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, public modalRef: BsModalRef, private instanceService: InstanceService, private notificationsService: NotificationsService) {
    this.algoInstanceForm = this.fb.group({
      InstanceName: ['', { validators: [Validators.required], updateOn: 'submit'}],
      BacktestTradingAssetBalance: ['', {validators: [Validators.required, Validators.min(0)], updateOn: 'submit'}],
      BacktestAssetTwoBalance: ['', {validators: [Validators.required, Validators.min(0)], updateOn: 'submit'}]
    });

    this.dpConfig = {
      max: moment(),
      format: 'YYYY-MM-DD',
    };
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.algoInstanceForm.markAsDirty();
    if (!this.algoInstanceForm.valid) {
      return;
    }

    const backtestData = {...this.algoInstanceData, ...this.algoInstanceForm.value};

    this.instanceService.backtest(backtestData).subscribe((data) => {
      this.subscriptions.push(this.instanceService.algoDeploy(this.algoInstanceData.AlgoClientId, data.AlgoId, data.InstanceId)
        .subscribe(() => {
          this.notificationsService.success('Backtest instance created successfully.');
          this.modalRef.hide();
          this.onSuccess(data);
        }, () => {
          this.notificationsService.error('Error', 'There was an error while running your instance.');
          this.modalRef.hide();
        }));
    });
  }

}
