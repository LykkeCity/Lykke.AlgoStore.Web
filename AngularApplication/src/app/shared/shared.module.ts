import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PopupComponent } from '../components/popup/popup.component';
import { BsDropdownModule, ModalModule, PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { UiSwitchModule } from 'ngx-ui-switch';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AlertModule } from 'ngx-bootstrap';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { StarRatingConfigService } from './star-rating/star-rating-config';
import { ACLGuard } from '../services/acl.guard';
import { UserDetailsGuard } from '../services/user-details.guard';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoaderComponent } from './loader/loader.component';
import { CollapseContentComponent } from './collapse/collapse-content.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UiSwitchModule,
    AceEditorModule,
    DpDatePickerModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    NgxDatatableModule
  ],
  providers: [StarRatingConfigService, ACLGuard, UserDetailsGuard],
  declarations: [
    PopupComponent,
    CodeEditorComponent,
    DateTimePickerComponent,
    StarRatingComponent,
    LoaderComponent,
    CollapseContentComponent
  ],
  exports: [
    CommonModule,
    PopupComponent,
    CodeEditorComponent,
    DateTimePickerComponent,
    AlertModule,
    ModalModule,
    TooltipModule,
    BsDropdownModule,
    StarRatingComponent,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    PopoverModule,
    LoaderComponent,
    CollapseContentComponent
  ]
})
export class SharedModule {}
