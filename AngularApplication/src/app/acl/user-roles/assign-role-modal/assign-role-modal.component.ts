import { Component, OnInit } from '@angular/core';
import { UserData } from '../../../models/userdata.interface';
import { UserRole } from '../../../models/user-role.model';
import { UserRolesService } from '../../../services/user-roles.service';
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

  constructor(private userRoleService: UserRolesService,
              private fb: FormBuilder,
              private bsModalRef: BsModalRef,
              private notificationsService: NotificationsService) {
    this.roleGroup = this.fb.group({
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  save(): void {
    this.userRoleService.assignRole(this.userData.ClientId, this.roleGroup.value.role).subscribe(() => {
      this.onSuccess();
      this.bsModalRef.hide();
      this.notificationsService.success('Success', 'Role assigned successfully..');
    });
  }

}
