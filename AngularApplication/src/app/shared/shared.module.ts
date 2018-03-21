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
  providers: [],
  declarations: [
    PopupComponent,
    CodeEditorComponent,
    DateTimePickerComponent
  ],
  exports: [
    CommonModule,
    PopupComponent,
    CodeEditorComponent,
    DateTimePickerComponent,
    AlertModule,
    ModalModule
  ]
})
export class SharedModule {}
