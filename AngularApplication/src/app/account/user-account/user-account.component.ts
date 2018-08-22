import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { UserData } from '../../models/userdata.interface';
import { DeactivateAccountPopupComponent } from '../deactivate-account-popup/deactivate-account-popup.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnDestroy {

  agreed: boolean;
  user: UserData;
  modalRef: BsModalRef;

  constructor(private userService: UserService,
              private modalService: BsModalService,
              private notificationsService: NotificationsService,
              private authService: AuthService) {
    this.userService.loggedUserSubject.subscribe(user => {
      this.user = user;
    });

  }

  ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  deactivateAccount(): void {
    const initialState = {
      onDeactivateSuccess: () => {
        this.userService.deactivateAccount().subscribe(() => {
          this.notificationsService.success('Success', 'The deactivation of your account has started.');
          this.authService.logout();
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
