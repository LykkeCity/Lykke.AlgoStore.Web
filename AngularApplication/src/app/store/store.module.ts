import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ArchwizardModule } from 'ng2-archwizard';
import { DataTablesModule } from 'angular-datatables';
import { TooltipModule } from 'ngx-bootstrap';
import { StarRatingModule } from 'angular-star-rating';

// ROUTING
import { StoreRouting } from './store-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { StoreComponent } from './store.component';
import { AlgoListComponent } from './algo-list/algo-list.component';
import { AlgoEditComponent } from './algo-edit/algo-edit.component';
import { CommandsComponent } from '../components/commands/commands.component';
import { AlgoDetailsComponent } from './algo-details/algo-details.component';
import { AlgoListMyAlgosComponent } from './algo-list-my-algos/algo-list-my-algos.component';

// SERVICES
@NgModule({
  imports: [
    StoreRouting,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ArchwizardModule,
    DataTablesModule,
    TooltipModule.forRoot(),
    StarRatingModule.forRoot()
  ],
  declarations: [
    CommandsComponent,
    StoreComponent,
    AlgoListComponent,
    AlgoEditComponent,
    AlgoDetailsComponent,
    AlgoListMyAlgosComponent
  ],
  providers: []
})
export class StoreModule { }
