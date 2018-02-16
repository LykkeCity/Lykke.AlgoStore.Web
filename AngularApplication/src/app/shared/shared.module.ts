import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TerminalComponent } from '../components/terminal/terminal.component';
import { PopupComponent } from '../components/popup/popup.component';
import { ModalModule } from 'ngx-bootstrap';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { UiSwitchModule } from 'ngx-ui-switch';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UiSwitchModule,
    AceEditorModule,
    ModalModule.forRoot()
  ],
  providers: [],
  declarations: [
    PopupComponent,
    TerminalComponent,
    CodeEditorComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    PopupComponent,
    TerminalComponent,
    CodeEditorComponent
  ]
})
export class SharedModule {}
