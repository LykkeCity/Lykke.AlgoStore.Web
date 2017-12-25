import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PopupComponent } from '../components/popup/popup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  declarations: [
    PopupComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    PopupComponent
  ]
})
export class SharedModule {}
