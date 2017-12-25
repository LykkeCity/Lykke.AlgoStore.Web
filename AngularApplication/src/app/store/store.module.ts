import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ROUTING
import { StoreRouting } from './store-routing.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { StoreComponent } from './store.component';
import { AlgoDetailsComponent } from './algo-details/algo-details.component';
import { AlgoEditComponent } from './algo-edit/algo-edit.component';
import { AlgoListComponent } from './algo-list/algo-list.component';
import { CommandsComponent } from '../components/commands/commands.component';

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
    CommonModule
  ],
  declarations: [
    StoreComponent,
    CommandsComponent,
    AlgoDetailsComponent,
    AlgoEditComponent,
    AlgoListComponent
  ],
  providers: []
})
export class StoreModule { }
