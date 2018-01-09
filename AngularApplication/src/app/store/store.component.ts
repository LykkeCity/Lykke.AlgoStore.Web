import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from '../services/store.service';
import { Algo } from '../models/algo.interface';
import { Language } from '../models/language.enum';
import { EventService } from '../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {
  algos: Array<Algo>;
  isLinear = false;
  secondFormGroup: FormGroup;
  updateFormGroup: FormGroup;
  hasErrors: Boolean;
  Language: any = Language;
  activeAlgo: Algo;

  @ViewChild('stepper') stepper: MatStepper;

  private subscriptions = new Subscription();

  constructor(private storeService: StoreService,
    private eventService: EventService,
    private notificationsService: NotificationsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.updateFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.subscriptions.add(this.storeService.algoGetAll()
      .subscribe((data: Algo[]) => {

        this.storeService.algosStore = data;
        this.storeService._algos.next([...data]);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.notificationsService.error('Error', 'An error occurred!');
        } else {
          this.storeService.algosStore = [];
          this.storeService._algos.next([]);
        }
      }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setLanguage(language: Language) {
    switch (language) {
      case Language.NET:
        console.log('NET');
        break;
      case Language.Python:
        console.log('Python');
        break;

      default:
        console.log('Java');
        break;
    }

    this.stepper.next();
  }

  // Set state for 'Next' button on 'update' tab
  isAlgoDetailsButtonDisabled() {
    if (!this.updateFormGroup.valid) {
      return true;
    }
  }

  // Button 'Next' on 'update' tab click method
  update() {
    this.stepper.selectedIndex = 2;

    this.stepper.next();

    if (this.updateFormGroup.controls.name.value) {

      const algo = {
        Name: this.updateFormGroup.controls.name.value,
        Description: this.updateFormGroup.controls.description.value
      };

      this.storeService.algoCreateDetails(algo)
        .subscribe((data: any) => {
          this.storeService.algosStore = data;
          this.storeService._algos.next([data]);

          this.storeService.activeAlgo = data;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            this.storeService.algosStore = [];
            this.storeService._algos.next([]);
          }
        });
    }
    return false;
  }
}
