import { Component, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { AlgoInstanceData } from '../../models/algo-instance.model';
import { InstanceService } from '../../../core/services/instance.service';


@Component({
  selector: 'app-algo-run-popup',
  templateUrl: './algo-instance-popup.component.html',
  styleUrls: ['./algo-instance-popup.component.scss']
})
export class AlgoInstancePopupComponent implements OnDestroy {

  algoInstanceForm: FormGroup;
  instanceId: string;
  type: string;
  algoInstanceData: AlgoInstanceData;
  onEditSuccess: Function;
  onInstanceCreateSuccess: Function;
  subscriptions: Subscription[] = [];

  loader = false;


  constructor(public modalRef: BsModalRef,
              private instanceService: InstanceService,
              private fb: FormBuilder,
              private notificationsService: NotificationsService) {
    this.algoInstanceForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onSubmit(): void {
    if (this.algoInstanceForm.invalid) {
      return;
    }

    this.loader = true;

    switch (this.type) {
      case 'Live':
        const liveAlgoData = {
          ...this.algoInstanceData,
          InstanceName: this.algoInstanceForm.value.name,
          AlgoMetaDataInformation: JSON.parse(JSON.stringify(this.algoInstanceData.AlgoMetaDataInformation))
        };

        liveAlgoData.AlgoMetaDataInformation.Parameters.forEach(param => {
          delete param.PredefinedValues;
        });

        liveAlgoData.AlgoMetaDataInformation.Functions.forEach(func => {
          func.Parameters.forEach(param => {
            delete param.PredefinedValues;
          });
        });

        this.subscriptions.push(this.instanceService.createLiveAlgoIntance(liveAlgoData)
          .subscribe((data) => {
            this.onInstanceCreateSuccess(data);
            this.loader = false;
            this.notificationsService.success('Success', 'Algo instance created successfully.');
            this.modalRef.hide();
          }, (error) => {
            this.notificationsService.error('Error', error.DisplayMessage);
            this.modalRef.hide();
          }));
        break;
      case 'Edit':
        this.instanceService.editName(this.instanceId, this.algoInstanceForm.value).subscribe(() => {
          this.modalRef.hide();
          this.onEditSuccess(this.algoInstanceForm.value.name);
        }, (error) => {
          this.notificationsService.error('Error', error.DisplayMessage);
          this.modalRef.hide();
        });
        break;
    }
  }
}
