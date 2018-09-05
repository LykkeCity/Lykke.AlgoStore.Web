import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-deactivate-account-popup',
  templateUrl: './deactivate-account-popup.component.html',
  styleUrls: ['./deactivate-account-popup.component.scss']
})
export class DeactivateAccountPopupComponent {

  onDeactivateSuccess: Function;
  agreed: boolean;
  loader = false;

  constructor(public bsModalRef: BsModalRef) { }

  deactivateAccount(): void {
    this.loader = true;
    this.onDeactivateSuccess();
  }
}
