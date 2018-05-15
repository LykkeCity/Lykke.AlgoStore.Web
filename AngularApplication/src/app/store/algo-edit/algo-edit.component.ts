import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AlgoService } from '../../services/algo.service';
import { Algo } from '../models/algo.interface';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseAlgoParam } from '../models/base-algo-param.model';
import { AlgoInstancePopupComponent } from '../algo-run/algo-run-popup/algo-instance-popup.component';
import { BsModalService } from 'ngx-bootstrap';
import { PopupConfig } from '../../models/popup.interface';
import { PopupComponent } from '../../components/popup/popup.component';
import { NotificationsService } from 'angular2-notifications';

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

  subscriptions: Subscription[] = [];
  constructor(private algoService: AlgoService,
              private route: ActivatedRoute,
              private ref: ChangeDetectorRef,
              private fb: FormBuilder,
              private bsModalService: BsModalService,
              private notificationsService: NotificationsService,
              private router: Router) {
    this.algoForm = this.fb.group({
      Name: ['',  { validators: [Validators.required], updateOn: 'submit'}],
      Description: ['', { updateOn: 'submit' }]
    });

    this.canBePublished = true;
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      const algoId = params['algoId'];
      const clientId = params['clientId'];
      this.subscriptions.push(this.algoService.getAlgoWithSource(algoId, clientId).subscribe(algo => {
        this.algo = algo;
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
    this.algo.Data = code;
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

  }

  onSubmit(): void {
    if (this.algoForm.invalid) {
      this.algoForm.markAsDirty();
      return;
    }


  }
}
