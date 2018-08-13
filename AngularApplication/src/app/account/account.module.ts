import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { DeactivateAccountPopupComponent } from './deactivate-account-popup/deactivate-account-popup.component';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountComponent,
    UserAccountComponent,
    DeactivateAccountPopupComponent
  ],
  entryComponents: [DeactivateAccountPopupComponent]
})
export class AccountModule {
}
