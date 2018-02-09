import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ArchwizardModule } from 'ng2-archwizard';
import { DataTablesModule } from 'angular-datatables';
import { TooltipModule } from 'ngx-bootstrap';
import { StarRatingModule } from 'angular-star-rating';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiSwitchModule } from 'angular2-ui-switch'

// ROUTING
import { StoreRouting } from './store-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { StoreComponent } from './store.component';
import { AlgoListComponent } from './algo-list/algo-list.component';
import { AlgoEditComponent } from './algo-edit/algo-edit.component';
import { CommandsComponent } from '../components/commands/commands.component';
import { AlgoDetailsComponent } from './algo-details/algo-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlgoListMyAlgosComponent } from './algo-list-my-algos/algo-list-my-algos.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { AlgoMetadataComponent } from './algo-details/algo-metadata/algo-metadata.component';

// SERVICES
@NgModule({
  imports: [
    StoreRouting,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ArchwizardModule,
    DataTablesModule,
    NgxDatatableModule,
    TooltipModule.forRoot(),
    StarRatingModule.forRoot(),
    AceEditorModule,
    UiSwitchModule
  ],
  declarations: [
    CommandsComponent,
    StoreComponent,
    AlgoListComponent,
    AlgoEditComponent,
    AlgoDetailsComponent,
    DashboardComponent,
    AlgoListMyAlgosComponent,
    AlgoMetadataComponent
  ],
  providers: []
})
export class StoreModule { }
