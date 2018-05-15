import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { AlgoService } from '../../../services/algo.service';

@Component({
  selector: 'app-algo-duplicate-popup',
  templateUrl: './algo-duplicate-popup.component.html',
  styleUrls: ['./algo-duplicate-popup.component.scss']
})
export class AlgoDuplicatePopupComponent implements OnInit, OnDestroy {

  algoDuplicateForm: FormGroup;
  onCreateSuccess: Function;
  algoName: string;
  algoId: string;
  subscriptions: Subscription[] = [];


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
      Name: this.algoName + ' copy'
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

    this.algoService.duplicateAlgo({...this.algoDuplicateForm.value, AlgoId: this.algoId}).subscribe((algo) => {
      this.onCreateSuccess(algo);
      this.notificationsService.success('Success', 'Algo duplicated successfully.');
      this.modalRef.hide();
    });

  }

}
