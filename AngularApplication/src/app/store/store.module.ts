import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

// ROUTING
import { StoreRouting } from './store-routing.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { StoreComponent } from './store.component'
import { AlgoListComponent } from './algo-list/algo-list.component';

// SERVICES
@NgModule({
  imports: [
    StoreRouting,
    CdkStepperModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ],
  declarations: [
    StoreComponent,
    AlgoListComponent
  ],
  providers: []
})
export class StoreModule { }
