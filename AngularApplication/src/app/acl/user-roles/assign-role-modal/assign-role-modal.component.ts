import { Component, OnInit } from '@angular/core';
import { UserData } from '../../../models/userdata.interface';
import { UserRole } from '../../../models/user-role.model';
import { UserRolesService } from '../../../core/services/user-roles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-assign-role-modal',
  templateUrl: './assign-role-modal.component.html',
  styleUrls: ['./assign-role-modal.component.scss']
})
export class AssignRoleModalComponent implements OnInit {

  userData: UserData;
  allRoles: UserRole[];
  onSuccess: Function;
  roleGroup: FormGroup;
  loader = false;

  constructor(private userRoleService: UserRolesService,
              private fb: FormBuilder,
              public bsModalRef: BsModalRef,
              private notificationsService: NotificationsService) {
    this.roleGroup = this.fb.group({
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  save(): void {
    this.loader = true;
    this.userRoleService.assignRole(this.userData.ClientId, this.roleGroup.value.role).subscribe(() => {
      this.onSuccess();
      this.bsModalRef.hide();
      this.notificationsService.success('Success', 'Role assigned successfully.');
    }, (error) => {
      this.loader = false;
      this.notificationsService.error('Error', error.DisplayMessage);
      this.bsModalRef.hide();
    });
  }

}
