import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ArchwizardModule } from 'ng2-archwizard';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularSplitModule } from 'angular-split';
import { TabsModule } from 'ngx-bootstrap';
import { QuillModule } from 'ngx-quill';
import { MomentModule } from 'angular2-moment';
import { NgxPaginationModule } from 'ngx-pagination';

// ROUTING
import { StoreRouting } from './store-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { StoreComponent } from './store.component';
import { AlgoListComponent } from './algo-list/algo-list.component';
import { AlgoEditComponent } from './algo-edit/algo-edit.component';
import { AlgoDetailsComponent } from './algo-details/algo-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlgoMetadataComponent } from './algo-details/algo-metadata/algo-metadata.component';
import { AlgoRunComponent } from './algo-run/algo-run.component';
import { AlgoInstancePopupComponent } from './algo-run/algo-run-popup/algo-instance-popup.component';
import { EditMetadataAttributeComponent } from './algo-run/edit-metadata-attribute/edit-metadata-attribute.component';
import { AlgoInstanceComponent } from './algo-instance/algo-instance.component';
import { AlgoInstanceListComponent } from './algo-run/algo-instance-list/algo-instance-list.component';
import { InstanceTypeNamePipe } from './pipes/instance-type-name.pipe';
import { InstanceStatusNamePipe } from './pipes/instance-status-name.pipe';
import { AlgoCommentsComponent } from './algo-details/algo-comments/algo-comments.component';
import { AlgoCommentEditPopupComponent } from './algo-details/algo-comments/algo-comment-edit-popup/algo-comment-edit-popup.component';

// SERVICES
@NgModule({
  imports: [
    StoreRouting,
    SharedModule,
    ArchwizardModule,
    NgxDatatableModule,
    TabsModule.forRoot(),
    AngularSplitModule,
    QuillModule,
    MomentModule,
    NgxPaginationModule
  ],
  declarations: [
    StoreComponent,
    AlgoListComponent,
    AlgoEditComponent,
    AlgoDetailsComponent,
    DashboardComponent,
    AlgoMetadataComponent,
    AlgoRunComponent,
    AlgoInstancePopupComponent,
    EditMetadataAttributeComponent,
    AlgoInstanceComponent,
    AlgoInstanceListComponent,
    InstanceTypeNamePipe,
    InstanceStatusNamePipe,
    AlgoCommentsComponent,
    AlgoCommentEditPopupComponent,
  ],
  providers: [],
  entryComponents: [AlgoInstancePopupComponent, AlgoCommentEditPopupComponent]
})
export class StoreModule { }
