import { Component, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs/Subscription';
import { AlgoInstanceData } from '../../models/algo-instance.model';
import { InstanceService } from '../../../services/instance.service';


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


  constructor(public modalRef: BsModalRef,
              private instanceService: InstanceService,
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
      case 'Live':
        this.subscriptions.push(this.instanceService.createLiveAlgoIntance({...this.algoInstanceData, ...this.algoInstanceForm.value})
          .subscribe((data) => {
            this.onInstanceCreateSuccess(data);
            this.subscriptions.push(this.instanceService.deployInstance(this.algoInstanceData.AlgoClientId, data.AlgoId, data.InstanceId)
              .subscribe(() => {
                this.notificationsService.success('Success', 'Algo instance created successfully.');
                this.modalRef.hide();
              }, () => {
                this.notificationsService.error('Error', 'There was an error while running your instance.');
                this.modalRef.hide();
              }));
          }, (error) => {
            this.notificationsService.error('Error', error.DisplayMessage);
            this.modalRef.hide();
          }));
        break;
      case 'Edit':
        // this.instanceService.editInstance(this.instanceId, this.algoInstanceForm.value).subscribe(() => {
        //   this.modalRef.hide();
        //   this.onEditSuccess(this.algoInstanceForm.value.Name);
        // });
        break;
    }
  }
}
