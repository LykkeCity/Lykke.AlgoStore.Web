import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TerminalComponent } from '../components/terminal/terminal.component';
import { PopupComponent } from '../components/popup/popup.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  declarations: [
    PopupComponent,
    TerminalComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    PopupComponent,
    TerminalComponent
  ]
})
export class SharedModule {}
