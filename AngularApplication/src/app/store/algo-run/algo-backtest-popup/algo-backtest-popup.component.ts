import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { InstanceService } from '../../../services/instance.service';
import { AlgoInstanceData } from '../../models/algo-instance.model';
import { IDatePickerConfig } from 'ng2-date-picker';
import * as moment from 'moment';

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

  constructor(private fb: FormBuilder, public modalRef: BsModalRef, private instanceService: InstanceService) {
    this.algoInstanceForm = this.fb.group({
      instanceName: ['', { validators: [Validators.required], updateOn: 'submit'}],
      tradeAssetBalance: ['', {validators: [Validators.required, Validators.min(0)], updateOn: 'submit'}],
      assetTwoBalance: ['', {validators: [Validators.required, Validators.min(0)], updateOn: 'submit'}],
      instanceStartDate: ['', { validators: [Validators.required], updateOn: 'submit'}]
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

    this.instanceService.backtest({...this.algoInstanceData, ...this.algoInstanceForm.value}).subscribe((data) => {
      this.modalRef.hide();
      this.onSuccess(data);
    });
  }

}
