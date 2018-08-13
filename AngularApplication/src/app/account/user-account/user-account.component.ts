import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserService } from '../../core/services/user.service';
import { UserData } from '../../models/userdata.interface';
import { DeactivateAccountPopupComponent } from '../deactivate-account-popup/deactivate-account-popup.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  agreed: boolean;
  user: UserData;
  modalRef: BsModalRef;

  constructor(private userService: UserService, private modalService: BsModalService) {
    this.userService.loggedUserSubject.subscribe(user => {
      this.user = user;
      console.log(this.user);
    });

  }

  ngOnInit() {
  }

  deactivateAccount(): void {
    const initialState = {
      onDeactivateSuccess: () => {
        this.userService.deactivateAccount().subscribe(() => {

        });
      }
    };
    const config = {
      class: 'modal-sm',
      keyboard: false,
      ignoreBackdropClick: true,
      initialState
    };
    this.modalRef = this.modalService.show(DeactivateAccountPopupComponent, config);
  }
}
