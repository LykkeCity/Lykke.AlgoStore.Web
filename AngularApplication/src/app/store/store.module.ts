import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ArchwizardModule } from 'ng2-archwizard';
import { AngularSplitModule } from 'angular-split';
import { TabsModule } from 'ngx-bootstrap';
import { QuillModule } from 'ngx-quill';
import { MomentModule } from 'angular2-moment';
import { NgxPaginationModule } from 'ngx-pagination';

// ROUTING
import { StoreRouting } from './store-routing.module';

// COMPONENTS
import { StoreComponent } from './store.component';
import { AlgoListComponent } from './algo-list/algo-list.component';
import { AlgoDetailsComponent } from './algo-details/algo-details.component';
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
import { AlgoBacktestPopupComponent } from './algo-run/algo-backtest-popup/algo-backtest-popup.component';
import { MyAlgosComponent } from './my-algos/my-algos.component';
import { AlgoEditComponent } from './algo-edit/algo-edit.component';
import { AlgoCreateComponent } from './algo-create/algo-create.component';
import { AlgoDuplicatePopupComponent } from './my-algos/algo-duplicate-popup/algo-duplicate-popup.component';

// SERVICES
@NgModule({
  imports: [
    StoreRouting,
    SharedModule,
    ArchwizardModule,
    TabsModule.forRoot(),
    AngularSplitModule,
    QuillModule,
    MomentModule,
    NgxPaginationModule
  ],
  declarations: [
    StoreComponent,
    AlgoListComponent,
    AlgoDetailsComponent,
    MyAlgosComponent,
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
    AlgoBacktestPopupComponent,
    AlgoEditComponent,
    AlgoCreateComponent,
    AlgoDuplicatePopupComponent,
  ],
  providers: [],
  entryComponents: [AlgoInstancePopupComponent, AlgoCommentEditPopupComponent, AlgoBacktestPopupComponent, AlgoDuplicatePopupComponent]
})
export class StoreModule { }
