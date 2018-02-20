import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { StoreService } from '../services/store.service';
import { Language } from '../models/language.enum';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {
  updateFormGroup: FormGroup;
  success = false;
  Language = Language;
  id: string;

  algoCreateSubscription: Subscription;

  constructor(private storeService: StoreService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.updateFormGroup = this.formBuilder.group({
      Name: ['', Validators.required],
      Description: ['']
    });
  }

  ngOnDestroy() {
    if (this.algoCreateSubscription) {
      this.algoCreateSubscription.unsubscribe();
    }
  }

  setLanguage(language: Language): void {
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
  }

  // Button 'Next' on 'update' tab click method
  update(): void {
    if (!this.updateFormGroup.valid) {
      return;
    }

    this.algoCreateSubscription = this.storeService.algoCreateDetails(this.updateFormGroup.value).subscribe((algo) => {
      this.id = algo.Id;
      this.success = true;
    });
  }
}
