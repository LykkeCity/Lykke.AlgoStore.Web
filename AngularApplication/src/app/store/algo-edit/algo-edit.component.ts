import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AlgoService } from '../../services/algo.service';
import { Algo, AlgoVisibility } from '../models/algo.interface';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseAlgoParam } from '../models/base-algo-param.model';
import { BsModalService } from 'ngx-bootstrap';
import { PopupConfig } from '../../models/popup.interface';
import { PopupComponent } from '../../components/popup/popup.component';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../../services/user.service';
import Permissions from '../models/permissions';
import { InstanceService } from '../../services/instance.service';
import { AlgoInstance } from '../models/algo-instance.model';

@Component({
  selector: 'app-algo-create',
  templateUrl: './algo-edit.component.html',
  styleUrls: ['./algo-edit.component.scss']
})
export class AlgoEditComponent implements OnInit, OnDestroy {

  algo: Algo;
  editor: any;
  algoForm: FormGroup;
  canBePublished: boolean;
  iAlgoVisibility = AlgoVisibility;
  algoErrors: string;
  instances: AlgoInstance[];
  forceDelete: boolean;

  permissions: {
    canPublish: boolean,
    canUnpublish: boolean,
    canDelete: boolean
  };

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
      Name: ['',  { validators: [Validators.required], updateOn: 'submit'}],
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
          this.forceDelete = instances && instances.length > 0;
        }));

        this.algoForm.setValue({
          Name: this.algo.Name,
          Description: this.algo.Description
        });
      }));
    }));
  }

  ngOnDestroy() {
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
    this.bsModalService.show(PopupComponent, {initialState, class: 'modal-sm', keyboard: false, ignoreBackdropClick: true});
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
      this.notificationsService.error('Error', error.DisplayMessage);
    }));
  }

  goPublic(): void {
    if (!this.permissions.canPublish) {
      return;
    }

    this.subscriptions.push(this.algoService.publish(this.algo.AlgoId, this.algo.ClientId).subscribe(() => {
      this.algo.AlgoVisibility = this.iAlgoVisibility.Public;
      this.notificationsService.success('Success', 'Algo has been published successfully.');
    }));
  }

  goPrivate(): void {
    if (!this.permissions.canUnpublish) {
      return;
    }

    this.subscriptions.push(this.algoService.unpublish(this.algo.AlgoId, this.algo.ClientId).subscribe(() => {
      this.algo.AlgoVisibility = this.iAlgoVisibility.Private;
      this.notificationsService.success('Success', 'Algo has been unpublished successfully.');
    }, (error) => {
      this.notificationsService.error('Error', error.DisplayMessage);
    }));
  }

  onSubmit(): void {
    if (this.algoForm.invalid) {
      this.algoForm.markAsDirty();
      return;
    }

    const tempAlgo = { ...this.algoForm.value, Id: this.algo.AlgoId, DateCreated: this.algo.DateCreated, DateModified: this.algo.DateModified, Content: btoa(this.algo.Content) };
    this.algoErrors = null;

    this.subscriptions.push(this.algoService.editAlgo(tempAlgo).subscribe(() => {
      this.notificationsService.success('Success', 'Algo has been edited successfully.');
      this.router.navigate(['/store/my-algos']);
    }, (error) => {
      this.algoErrors = error.DisplayMessage;
    }));
  }
}
