import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalNotificationComponent } from './legal-notification/legal-notification.component';

import { LegalRoutingModule } from './legal-routing.module';
import { LegalComponent } from './legal.component';

@NgModule({
  imports: [
    CommonModule,
    LegalRoutingModule
  ],
  declarations: [
    LegalNotificationComponent,
    LegalComponent
  ]
})
export class LegalModule { }
