import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TerminalComponent } from '../components/terminal/terminal.component';
import { PopupComponent } from '../components/popup/popup.component';
import { ModalModule } from 'ngx-bootstrap';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { UiSwitchModule } from 'ngx-ui-switch';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { DpDatePickerModule } from 'ng2-date-picker';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UiSwitchModule,
    AceEditorModule,
    DpDatePickerModule,
    ModalModule.forRoot()
  ],
  providers: [],
  declarations: [
    PopupComponent,
    TerminalComponent,
    CodeEditorComponent,
    DateTimePickerComponent
  ],
  exports: [
    CommonModule,
    PopupComponent,
    TerminalComponent,
    CodeEditorComponent,
    DateTimePickerComponent
  ]
})
export class SharedModule {}
