import { Component, Input } from '@angular/core';
import { AlgoInstance, IAlgoInstanceStatus } from '../../models/algo-instance.model';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from '../../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { PopupComponent } from '../../../components/popup/popup.component';
import { BsModalService } from 'ngx-bootstrap';
import { PopupConfig } from '../../../models/popup.interface';

@Component({
  selector: 'app-algo-instance-list',
  templateUrl: './algo-instance-list.component.html',
  styleUrls: ['./algo-instance-list.component.scss']
})
export class AlgoInstanceListComponent {

  @Input() algoId: string;
  @Input() instancesArray: AlgoInstance[];
  subscriptions: Subscription[] = [];
  clientId: string;
  iAlgoInstanceStatus = IAlgoInstanceStatus;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private notificationsService: NotificationsService,
    private bsModalService: BsModalService
  ) {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.clientId = params['clientId'];
    }));
  }

  deleteInstancePrompt(instance: AlgoInstance): void {
    const initialState = {
      popupConfig: {
        title: 'Delete instance',
        text: `Are you sure you want to delete ${instance.InstanceName}?`,
        btnCancelText: 'Cancel',
        btnConfirmText: 'Delete',
        successCallback: () => {
          this.deleteInstance(instance);
        }
      } as PopupConfig
    };
    this.bsModalService.show(PopupComponent, {initialState, class: 'modal-sm', keyboard: false, ignoreBackdropClick: true});
  }

  deleteInstance(instance: AlgoInstance): void {
    this.subscriptions.push(this.storeService.deleteAlgoInstance(instance).subscribe(() => {
      this.notificationsService.success('Success', 'Instance has been deleted successfully.');
      this.instancesArray = this.instancesArray.filter(
        i => (i.InstanceId !== instance.InstanceId)
      );
    }));
  }

}
