import { UserRole } from './user-role.model';

export interface UserData {
  ClientId?: string;
  Address: string;
  City: string;
  Country: string;
  Email: string;
  FirstName: string;
  FullName: string;
  LastName: string;
  Phone: string;
  Zip: string;

  Roles?: UserRole[];
}
