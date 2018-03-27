import { Balance } from './balance.model';

export interface Wallet {
  Id?: string;
  Name?: string;
  Type?: string;
  Description?: string;
  ApiKey?: string;
  Balances?: Balance[];
}
