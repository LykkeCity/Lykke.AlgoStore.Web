import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AlgoService } from '../../core/services/algo.service';
import { Algo, AlgoVisibility } from '../models/algo.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseAlgoParam } from '../models/base-algo-param.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PopupConfig } from '../../models/popup.interface';
import { PopupComponent } from '../../components/popup/popup.component';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../../core/services/user.service';
import Permissions from '../models/permissions';
import { InstanceService } from '../../core/services/instance.service';
import { AlgoInstance, IAlgoInstanceStatus } from '../models/algo-instance.model';
import { DATETIME_DISPLAY_FORMAT } from '../../core/utils/date-time';

@Component({
  selector: 'app-algo-edit',
  templateUrl: './algo-edit.component.html',
  styleUrls: ['./algo-edit.component.scss']
})
export class AlgoEditComponent implements OnInit, OnDestroy {

  algo: Algo;
  editor: any;
  algoForm: FormGroup;
  canBePublished: boolean;
  iAlgoVisibility = AlgoVisibility;
  iAlgoInstanceStatus = IAlgoInstanceStatus;
  algoErrors: string;
  instances: AlgoInstance[];
  forceDelete: boolean;
  displayDateFormat =  DATETIME_DISPLAY_FORMAT;

  permissions: {
    canPublish: boolean,
    canUnpublish: boolean,
    canDelete: boolean
  };

  loader = false;
  modalRef: BsModalRef;

  subscriptions: Subscription[] = [];

  constructor(private algoService: AlgoService,
              private route: ActivatedRoute,
              private ref: ChangeDetectorRef,
              private fb: FormBuilder,
              private bsModalService: BsModalService,
              private notificationsService: NotificationsService,
              private router: Router,
              private usersService: UserService,
              private instanceService: InstanceService) {
    this.algoForm = this.fb.group({
      Name: ['', { validators: [Validators.required], updateOn: 'submit' }],
      Description: ['', { updateOn: 'submit' }]
    });

    this.canBePublished = true;

    this.permissions = {
      canPublish: this.usersService.hasPermission(Permissions.ADD_TO_PUBLIC),
      canUnpublish: this.usersService.hasPermission(Permissions.REMOVE_FROM_PUBLIC),
      canDelete: this.usersService.hasPermission(Permissions.DELETE_ALGO)
    };
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      const algoId = params['algoId'];
      const clientId = params['clientId'];
      this.subscriptions.push(this.algoService.getAlgoWithSource(algoId, clientId).subscribe(algo => {
        this.algo = algo;
        this.algo.ClientId = clientId;

        this.subscriptions.push(this.instanceService.getAlgoInstances(algoId).subscribe(instances => {
          this.instances = instances;
          let hasRunning = false;

          for (const inst of this.instances) {
            if (inst.AlgoInstanceStatus === this.iAlgoInstanceStatus.Running
              || inst.AlgoInstanceStatus === this.iAlgoInstanceStatus.Deploying) {
              hasRunning = true;
              break;
            }
          }

          this.forceDelete = instances && instances.length > 0 && !hasRunning;
        }));

        this.algoForm.setValue({
          Name: this.algo.Name,
          Description: this.algo.Description
        });
      }));
    }));
  }

  ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.hide();
    }

    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onEditorCreated(editor: any): void {
    this.editor = editor;
  }

  onCodeUpdate(code: string): void {
    this.canBePublished = false;
    this.algo.Content = code;
    this.ref.detectChanges();
  }

  highlight(meta: BaseAlgoParam): void {
    this.editor.find(meta.Key);
    this.editor.setHighlightActiveLine(true);
  }

  onInputChange(): void {
    this.canBePublished = false;
  }

  delete(force: boolean): void {
    if (!this.permissions.canDelete) {
      return;
    }

    const initialState = {
      popupConfig: {
        title: 'Delete algo',
        text: `Are you sure you want to delete ${this.algo.Name}?`,
        btnCancelText: 'Cancel',
        btnConfirmText: 'Delete',
        successCallback: () => {
          this.deleteAlgo(force);
        }
      } as PopupConfig
    };
    this.modalRef = this.bsModalService.show(PopupComponent, {
      initialState,
      class: 'modal-sm',
      keyboard: false,
      ignoreBackdropClick: true
    });
  }

  deleteAlgo(force: boolean): void {
    const deleteModel = {
      AlgoId: this.algo.AlgoId,
      AlgoClientId: this.algo.ClientId,
      ForceDelete: force
    };

    this.subscriptions.push(this.algoService.delete(deleteModel).subscribe(() => {
      this.notificationsService.success('Success', 'Algo has been deleted successfully.');
      this.router.navigate(['/store/my-algos']);
    }, (error) => {
      this.modalRef.hide();
      this.notificationsService.error('Error', error.DisplayMessage);
    }));
  }

  goPublic(): void {
    if (!this.permissions.canPublish) {
      return;
    }

    this.loader = true;

    this.subscriptions.push(this.algoService.publish(this.algo.AlgoId, this.algo.ClientId).subscribe(() => {
      this.algo.AlgoVisibility = this.iAlgoVisibility.Public;
      this.notificationsService.success('Success', 'Algo has been published successfully.');
      this.loader = false;
    }));
  }

  goPrivate(): void {
    if (!this.permissions.canUnpublish) {
      return;
    }

    this.loader = true;

    this.subscriptions.push(this.algoService.unpublish(this.algo.AlgoId, this.algo.ClientId).subscribe(() => {
      this.algo.AlgoVisibility = this.iAlgoVisibility.Private;
      this.notificationsService.success('Success', 'Algo has been unpublished successfully.');
      this.loader = false;
    }, (error) => {
      this.notificationsService.error('Error', error.DisplayMessage);
      this.loader = false;
    }));
  }

  onSubmit(): void {
    if (this.algoForm.invalid) {
      this.algoForm.markAsDirty();
      return;
    }

    this.loader = true;

    const tempAlgo = {
      ...this.algoForm.value,
      Id: this.algo.AlgoId,
      DateCreated: this.algo.DateCreated,
      DateModified: this.algo.DateModified,
      Content: btoa(this.algo.Content)
    };
    this.algoErrors = null;

    this.subscriptions.push(this.algoService.editAlgo(tempAlgo).subscribe(() => {
      this.notificationsService.success('Success', 'Algo has been edited successfully.');
      this.router.navigate(['/store/my-algos']);
    }, (error) => {
      this.algoErrors = error.DisplayMessage;
      this.loader = false;
    }));
  }
}
