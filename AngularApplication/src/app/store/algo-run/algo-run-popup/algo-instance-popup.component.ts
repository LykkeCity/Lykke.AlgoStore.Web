import { Component, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { StoreService } from '../../../services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs/Subscription';
import { AlgoMetadata } from '../../models/algo-metadata.model';

interface AlgoInstanceData {
  walletId: string;
  algoClientId: string;
  algoId: string;
  algoMetadataInformation: AlgoMetadata;
}

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
  subscriptions: Subscription[] = [];


  constructor(public modalRef: BsModalRef,
              private storeService: StoreService,
              private fb: FormBuilder,
              private notificationsService: NotificationsService) {
    this.algoInstanceForm = this.fb.group({
      instanceName: ['', Validators.required]
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

    switch (this.type) {
      case 'Demo':
        this.subscriptions.push(this.storeService.createDemoAlgoIntance({...this.algoInstanceData, ...this.algoInstanceForm.value}).subscribe(() => {
          this.modalRef.hide();
        }));
        break;
      case 'Live':
        this.subscriptions.push(this.storeService.createLiveAlgoIntance({...this.algoInstanceData, ...this.algoInstanceForm.value}).subscribe((data) => {
          this.modalRef.hide();
          this.notificationsService.success('Algo instance created successfully.');
          this.subscriptions.push(this.storeService.algoDeploy(data['algoId'], data['instanceId']).subscribe(() => {
            this.notificationsService.success('Success', 'Algo instance started successfully.');
          }, () => {
            this.notificationsService.error('Error', 'There was an error while running your instance.');
          }));
        }, () => {
          this.notificationsService.error('Error', 'There was an error while creating your instance.');
        }));
        break;
      case 'Edit':
        // this.storeService.editInstance(this.instanceId, this.algoInstanceForm.value).subscribe(() => {
        //   this.modalRef.hide();
        //   this.onEditSuccess(this.algoInstanceForm.value.Name);
        // });
        break;
    }
  }
}
