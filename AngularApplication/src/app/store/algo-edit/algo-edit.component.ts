import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AlgoService } from '../../services/algo.service';
import { Algo, AlgoVisibility } from '../models/algo.interface';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseAlgoParam } from '../models/base-algo-param.model';
import { AlgoInstancePopupComponent } from '../algo-run/algo-run-popup/algo-instance-popup.component';
import { BsModalService } from 'ngx-bootstrap';
import { PopupConfig } from '../../models/popup.interface';
import { PopupComponent } from '../../components/popup/popup.component';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../../services/user.service';
import Permissions from '../models/permissions';

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
              private usersService: UserService) {
    this.algoForm = this.fb.group({
      Name: ['',  { validators: [Validators.required], updateOn: 'submit'}],
      Description: ['', { updateOn: 'submit' }]
    });

    this.canBePublished = true;

    this.permissions = {
      canPublish: this.usersService.hasPermission(Permissions.ADD_TO_PUBLIC),
      canUnpublish: this.usersService.hasPermission(Permissions.REMOVE_FROM_PUBLIC),
      canDelete: true // TODO change when exist
    };
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      const algoId = params['algoId'];
      const clientId = params['clientId'];
      this.subscriptions.push(this.algoService.getAlgoWithSource(algoId, clientId).subscribe(algo => {
        this.algo = algo;
        this.algo.Content = algo.Data; // TODO remove this custom mapping when the API unifies it
        this.algo.ClientId = clientId;

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

  runDemo(): void {
    const initialState = {
      type: 'Demo'
    };
    this.bsModalService.show(AlgoInstancePopupComponent, { initialState, class: 'modal-sm run-instance-popup' });
  }

  delete(): void {
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
          this.deleteAlgo(this.algo);
        }
      } as PopupConfig
    };
    this.bsModalService.show(PopupComponent, {initialState, class: 'modal-sm', keyboard: false, ignoreBackdropClick: true});
  }

  deleteAlgo(algo: Algo): void {
    // this.subscriptions.push(this.algoService.deleteAlgo(algo).subscribe(() => {
    //   this.notificationsService.success('Success', 'Algo has been deleted successfully.');
    //   this.router.navigate(['/store/my-algos']);
    // }));
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
    }));
  }

  onSubmit(): void {
    if (this.algoForm.invalid) {
      this.algoForm.markAsDirty();
      return;
    }

    const tempAlgo = { ...this.algoForm.value, Id: this.algo.AlgoId, Date: this.algo.Date, Content: btoa(this.algo.Content) };
    this.algoErrors = null;

    this.subscriptions.push(this.algoService.editAlgo(tempAlgo).subscribe(() => {
      this.notificationsService.success('Success', 'Algo has been edited successfully.');
      this.router.navigate(['/store/my-algos']);
    }, (error) => {
      this.algoErrors = error.DisplayMessage;
    }));
  }
}
