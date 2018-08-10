import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LegalNotificationComponent } from './legal-notification/legal-notification.component';

import { LegalRoutingModule } from './legal-routing.module';
import { LegalComponent } from './legal.component';

@NgModule({
  imports: [
    LegalRoutingModule,
    SharedModule
  ],
  declarations: [
    LegalNotificationComponent,
    LegalComponent
  ]
})
export class LegalModule { }
