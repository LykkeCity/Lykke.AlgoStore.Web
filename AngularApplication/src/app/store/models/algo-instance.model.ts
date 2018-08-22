import { AlgoMetadata } from './algo-metadata.model';

export enum IAlgoInstanceStatus {
  Deploying = 0,
  Running = 1,
  Stopped = 2,
  Errored = 3
}
export enum IAlgoInstanceType {
  Demo = 0,
  Live = 1,
  Test = 2,
  Errored = 3
}

export interface AlgoInstanceData {
  WalletId: string;
  AlgoClientId: string;
  AlgoId: string;
  AlgoMetaDataInformation: AlgoMetadata;
  AlgoInstanceType: IAlgoInstanceType;
  InstanceName: string;
  AlgoInstanceRunDate: string | null;
  RunDate?: string;
  StopDate?: string;
  CreateDate?: string;
}


export interface AlgoInstance extends AlgoInstanceData {
  InstanceId: string;
  AlgoInstanceStatus: IAlgoInstanceStatus;
}
