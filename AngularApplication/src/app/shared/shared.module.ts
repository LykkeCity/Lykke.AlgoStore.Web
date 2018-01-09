import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  declarations: [

  ],
  exports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {}
