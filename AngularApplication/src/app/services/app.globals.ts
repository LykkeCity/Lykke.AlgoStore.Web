import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserData } from '../models/userdata.interface';
export class AppGlobals {

  public static loggedUserSubject: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(null);

  public static getLoggedUser(): UserData {
    return AppGlobals.loggedUserSubject.getValue();
  }

  public static setLoggedUser(user: UserData): void {
    AppGlobals.loggedUserSubject.next(user);
  }
}
