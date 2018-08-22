import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AlgoInstance, IAlgoInstanceStatus, IAlgoInstanceType } from '../../models/algo-instance.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { PopupComponent } from '../../../components/popup/popup.component';
import { BsModalService } from 'ngx-bootstrap';
import { PopupConfig } from '../../../models/popup.interface';
import { InstanceService } from '../../../core/services/instance.service';
import { UserService } from '../../../core/services/user.service';
import Permissions from '../../models/permissions';

@Component({
  selector: 'app-algo-instance-list',
  templateUrl: './algo-instance-list.component.html',
  styleUrls: ['./algo-instance-list.component.scss']
})
export class AlgoInstanceListComponent implements OnChanges {

  @Input() algoId: string;
  @Input() instancesArray: AlgoInstance[];
  @Output() onInstanceDelete = new EventEmitter();

  displayInstances: AlgoInstance[];

  subscriptions: Subscription[] = [];
  clientId: string;
  iAlgoInstanceStatus = IAlgoInstanceStatus;
  permissions: {
    canDeleteInstance: boolean
  };

  showAll = false;

  constructor(
    private route: ActivatedRoute,
    private instanceService: InstanceService,
    private notificationsService: NotificationsService,
    private bsModalService: BsModalService,
    private usersService: UserService
  ) {
    this.permissions = {
      canDeleteInstance: this.usersService.hasPermission(Permissions.DELETE_ALGO_INSTANCE_DATA)
    };

    this.subscriptions.push(this.route.params.subscribe(params => {
      this.clientId = params['clientId'];
    }));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['instancesArray'] && changes['instancesArray'].currentValue) {
      this.instancesArray = changes['instancesArray'].currentValue;

      this.toggle(true);
    }
  }

  deleteInstancePrompt(instance: AlgoInstance): void {
    if (!this.permissions.canDeleteInstance) {
      return;
    }

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
    this.bsModalService.show(PopupComponent, { initialState, class: 'modal-sm', keyboard: false, ignoreBackdropClick: true });
  }

  deleteInstance(instance: AlgoInstance): void {
    this.subscriptions.push(this.instanceService.deleteAlgoInstance(instance).subscribe(() => {
      this.notificationsService.success('Success', 'Instance has been deleted successfully.');
      this.instancesArray = this.instancesArray.filter(
        i => (i.InstanceId !== instance.InstanceId)
      );

      this.toggle(true);

      if (instance.AlgoInstanceType === IAlgoInstanceType.Live) {
        this.onInstanceDelete.emit();
      }
    }));
  }

  toggle(initial?: boolean): void {
    if (!initial) {
      this.showAll = !this.showAll;
    }

    if (!this.showAll) {
      this.displayInstances = this.instancesArray.slice(0, 3);
    } else {
      this.displayInstances = this.instancesArray;
    }
  }

}
