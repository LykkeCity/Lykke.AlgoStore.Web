import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ROUTING
import { StoreRouting } from './store-routing.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { StoreComponent } from './store.component';

// SERVICES


@NgModule({
  imports: [
    StoreRouting,
    CdkStepperModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  declarations: [
    StoreComponent
  ],
  providers: []
})
export class StoreModule { }
