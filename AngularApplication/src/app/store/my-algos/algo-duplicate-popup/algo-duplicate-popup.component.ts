import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { AlgoService } from '../../../core/services/algo.service';
import { Algo } from '../../models/algo.interface';

@Component({
  selector: 'app-algo-duplicate-popup',
  templateUrl: './algo-duplicate-popup.component.html',
  styleUrls: ['./algo-duplicate-popup.component.scss']
})
export class AlgoDuplicatePopupComponent implements OnInit, OnDestroy {

  algoDuplicateForm: FormGroup;
  onCreateSuccess: Function;
  algo: Algo;
  subscriptions: Subscription[] = [];
  loader = false;


  constructor(public modalRef: BsModalRef,
              private algoService: AlgoService,
              private fb: FormBuilder,
              private notificationsService: NotificationsService) {
    this.algoDuplicateForm = this.fb.group({
      Name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.algoDuplicateForm.setValue({
      Name: this.algo.Name + ' copy'
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onSubmit(): void {
    if (this.algoDuplicateForm.invalid) {
      return;
    }

    this.loader = true;

    this.subscriptions.push(this.algoService.getAlgoSource((this.algo.Id || this.algo.AlgoId), this.algo.ClientId).subscribe((code) => {
      const toCopyAlgo = {
        ...this.algo,
        ...this.algoDuplicateForm.value,
        ...{
          Content: btoa(code.Content),
          Id: null,
          AlgoId: null
        }
      };

      this.subscriptions.push(this.algoService.createAlgo(toCopyAlgo).subscribe((algo) => {
        this.onCreateSuccess(algo);
        this.notificationsService.success('Success', 'Algo duplicated successfully.');
        this.modalRef.hide();
      }, (error) => {
        this.modalRef.hide();
        this.notificationsService.error('Error', error.DisplayMessage);
      }));
    }, (error) => {
      this.modalRef.hide();
      this.notificationsService.error('Error', error.DisplayMessage);
    }));
  }
}
