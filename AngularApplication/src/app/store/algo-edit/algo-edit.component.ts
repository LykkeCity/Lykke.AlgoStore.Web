import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from '../../services/store.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { Algo } from '../../models/algo.interface';

@Component({
  selector: 'app-algo-edit',
  templateUrl: './algo-edit.component.html',
  styleUrls: ['./algo-edit.component.scss']
})
export class AlgoEditComponent implements OnInit, OnDestroy {

  updateFormGroup: FormGroup;

  private subscriptions = new Subscription();

  constructor(
    private storeService: StoreService,
    private router: Router,
    private notificationService: NotificationsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.updateFormGroup = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['']
    });

    this.updateFormGroup.setValue({
      id: this.storeService.activeAlgo.Id,
      name: this.storeService.activeAlgo.Name,
      description: this.storeService.activeAlgo.Description
    });

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onAlgoUpdated = () => {
    this.router.navigate(['store/algo-list']);
  };

  onAlgoUpdatedError = (err: HttpErrorResponse) => {
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
    } else {
      this.notificationService.error('Error', 'Something went wrong!');
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
  };

  update() {
    if (this.updateFormGroup.controls.name.value) {

      const algo: Algo = {
        Id: this.storeService.activeAlgo.Id,
        Name: this.updateFormGroup.controls.name.value,
        Description: this.updateFormGroup.controls.description.value
      };

      this.subscriptions.add(this.storeService.algoCreateDetails(algo).subscribe(this.onAlgoUpdated, this.onAlgoUpdatedError));
    }
  }
}
