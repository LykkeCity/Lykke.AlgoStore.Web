import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserData } from '../models/userdata.interface';
import { UserPermission } from '../models/user-permission.model';
export class AppGlobals {

  public static loggedUserSubject: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(null);
  private static userPermissions: BehaviorSubject<UserPermission[]> = new BehaviorSubject<UserPermission[]>(null);

  public static getLoggedUser(): UserData {
    return AppGlobals.loggedUserSubject.getValue();
  }

  public static setLoggedUser(user: UserData): void {
    // additionally set the permissions in a new object so it can be easier for later checks
    const userPermissions = user.Roles.map(role => role.Permissions).reduce((acc, val) => acc.concat(val), []);
    AppGlobals.userPermissions.next(userPermissions);

    AppGlobals.loggedUserSubject.next(user);
  }

  public static hasPermission(permissionId: string): boolean {
    return AppGlobals.userPermissions.getValue().some(p => p.Id === permissionId);
  }
}
