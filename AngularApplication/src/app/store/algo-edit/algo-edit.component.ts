import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from '../../services/store.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { Algo } from '../models/algo.interface';

@Component({
  selector: 'app-algo-edit',
  templateUrl: './algo-edit.component.html',
  styleUrls: ['./algo-edit.component.scss']
})
export class AlgoEditComponent implements OnInit, OnDestroy {

  updateFormGroup: FormGroup;
  algo: Algo;

  private subscriptions = new Subscription();

  constructor(
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.updateFormGroup = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['']
    });

    this.route.params.subscribe(params => {
      const algoId = params['id'];

      this.storeService.getAlgoById(algoId).subscribe(algo => {
        this.algo = algo;

        this.updateFormGroup.setValue({
          id: this.algo.Id,
          name: this.algo.Name,
          description: this.algo.Description
        });
      });
    });

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  update() {
    if (this.updateFormGroup.valid) {
      this.subscriptions.add(this.storeService.algoCreateDetails(this.updateFormGroup.value).subscribe(() => {
        this.router.navigate(['store/algo-list']);
      }));
    }
  }
}
