import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../services/store.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import { Algo } from '../models/algo.interface';
import { Language } from '../models/language.enum';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  hasDeploymentErrors: boolean;
  file: FormData;
  fileName: any;
  showUploadSection: boolean;
  algos: Array<Algo>;
  isLinear = false;
  secondFormGroup: FormGroup;
  updateFormGroup: FormGroup;
  hasFile: boolean;
  showProgress: boolean = true;

  Language: any = Language;

  activeAlgo: Algo;

  @ViewChild('fileInput') fileInput;
  @ViewChild('stepper') stepper: MatStepper;

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

    this.storeService.algos.subscribe(result => {
      this.algos = result;

      console.log('this.storeService.activeAlgo: '+ this.storeService.activeAlgo);
      console.log("this.storeService.mode: "+ this.storeService.mode);
      console.log('this.algos.length: ' + this.algos.length);

      if (this.storeService.mode != 'create' && this.algos.length > 0) {
        this.router.navigate(["store/algo-list"]);
      } else {
        //this.storeService.mode = null;
        this.showUploadSection = !this.hasFile;
      }
    });

    this.eventService.subscribeToEvent('algo:deployment:done', this.onAlgoDeployed.bind(this));
    this.eventService.subscribeToEvent('algo:deployment:error', this.onAlgoDeploymentError.bind(this));
  }

  onAlgoDeployed(){
    this.showProgress = false;
    this.stepper.next();
  }

  onAlgoDeploymentError(message){
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
    let fileInput = document.querySelector('input[type="file"]') as HTMLElement;
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

      let algo = {
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
    this.router.navigate(["store/algo-list"]);
  }
}
