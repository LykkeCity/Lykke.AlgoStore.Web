export enum IAlgoInstanceStatus {
  Deploying = 0,
  Running = 1,
  Stopped = 2
}
export enum IAlgoInstanceType {
  Demo = 0,
  Live = 1,
  Test = 2
}

export class AlgoInstance {
  InstanceId?: string;
  InstanceName?: string;
  AlgoId?: string;
  Date?: string;
  AlgoMetaDataInformation?: string;
  AlgoInstanceStatus?: IAlgoInstanceStatus;
  AlgoInstanceType?: IAlgoInstanceType;
}
