import { NgModule } from '@angular/core';
import { LegalRedirectGuard } from '../core/guards/legal-redirect.guard';
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
  ],
  providers: [LegalRedirectGuard]
})
export class LegalModule { }
