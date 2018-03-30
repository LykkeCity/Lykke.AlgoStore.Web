import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PopupComponent } from '../components/popup/popup.component';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { UiSwitchModule } from 'ngx-ui-switch';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AlertModule } from 'ngx-bootstrap';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { StarRatingConfigService } from './star-rating/star-rating-config';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UiSwitchModule,
    AceEditorModule,
    DpDatePickerModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [StarRatingConfigService],
  declarations: [
    PopupComponent,
    CodeEditorComponent,
    DateTimePickerComponent,
    StarRatingComponent
  ],
  exports: [
    CommonModule,
    PopupComponent,
    CodeEditorComponent,
    DateTimePickerComponent,
    AlertModule,
    ModalModule,
    StarRatingComponent
  ]
})
export class SharedModule {}
