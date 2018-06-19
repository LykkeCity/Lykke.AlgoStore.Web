export interface UserPermission {
  Id?: string;
  Name?: string;
  DisplayName?: string;
  checked?: boolean;
}

export interface CollapsiblePermission {
  permissions: UserPermission[];
  collapseState: string;
}

export interface PermissionMap {
  [key: string]: CollapsiblePermission;
}
