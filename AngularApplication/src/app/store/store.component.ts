import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from '../services/store.service';
import { Algo } from '../models/algo.interface';
import { Language } from '../models/language.enum';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {
  hasDeploymentErrors: boolean;
  file: FormData;
  fileName: any;
  showUploadSection: boolean;
  algos: Array<Algo>;
  isLinear = false;
  secondFormGroup: FormGroup;
  updateFormGroup: FormGroup;
  hasFile: boolean;
  showProgress = true;

  Language: any = Language;

  activeAlgo: Algo;

  @ViewChild('fileInput') fileInput;
  @ViewChild('stepper') stepper: MatStepper;

  private subscriptions: Subscription[] = [];

  constructor(private storeService: StoreService,
    private eventService: EventService,
    private router: Router,
    private formBuilder: FormBuilder) {

    }

  ngOnInit() {

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.updateFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.storeService.algoGetAll();

    this.subscriptions.push(
      this.storeService.algos.subscribe(result => {
        this.algos = result;

        if (this.storeService.mode !== 'create' && this.algos.length > 0) {
          this.router.navigate(['store/algo-list']);
        } else {
          this.showUploadSection = !this.hasFile;
        }
      })
    );

    this.subscriptions.push(
      this.eventService.algoDeploymentDone.subscribe(this.onAlgoDeployed),
      this.eventService.algoDeploymentError.subscribe(this.onAlgoDeploymentError),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onAlgoDeployed = () => {
    this.showProgress = false;
    this.stepper.next();
  }

  onAlgoDeploymentError = () => {
    this.showProgress = false;
    this.hasDeploymentErrors = true;
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
     if (!this.hasFile && !this.updateFormGroup.valid) {
       return true;
     }
  }

  initiateUpload(e) {
    const fileInput = document.querySelector('input[type="file"]') as HTMLElement;
    fileInput.click();
  }

  // fileUpload 'change' method
  uploaded() {
    this.hasFile = true;
    this.file = this.fileInput.nativeElement.files[0];

    this.showUploadSection = false;
  }

  // Button 'Next' on 'update' tab click method
  update() {
    this.showUploadSection = false;
    this.stepper.selectedIndex = 2;

    if (this.updateFormGroup.controls.name.value) {

      const algo = {
        Name: this.updateFormGroup.controls.name.value,
        Description: this.updateFormGroup.controls.description.value
     };

      this.storeService.algoCreateDetails(algo, this.file);
      this.stepper.next();
    }

    return false;
  }

  algoCreateDetails(algo: Algo) {
    this.storeService.algoCreateDetails(algo);
  }

  showListOfAlgos() {
    this.router.navigate(['store/algo-list']);
  }
}
