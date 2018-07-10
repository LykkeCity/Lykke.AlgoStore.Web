import { IAlgoInstanceStatus, IAlgoInstanceType } from './algo-instance.model';

export interface UserInstance {
  InstanceId: string;
  ClientId: string;
  InstanceName: string;
  CreatedDate: string;
  RunDate: string;
  StopDate: string;
  Wallet: { Id: string, Name: string };
  InstanceStatus: IAlgoInstanceStatus;
  InstanceType: IAlgoInstanceType;
}
