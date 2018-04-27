import { UserPermission } from './user-permission.model';

export interface UserRole {
  Id?: string;
  Name?: string;
  CanBeModified?: boolean;
  CanBeDeleted?: boolean;
  Permissions?: UserPermission[];
}
