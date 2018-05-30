import { AlgoMetadata } from './algo-metadata.model';

export enum AlgoVisibility {
  Public = 0,
  Private = 1,
  Demo = 2
}

export interface Algo {
    Id?: string;
    AlgoId?: string;
    ClientId?: string;
    Name?: string;
    Description?: string;
    Date?: string;
    Status?: string;
    Author?: string;
    UsersCount?: string;
    Rating?: number;
    RatedUsersCount?: number;
    Data?: string;
    Content?: string;
    AlgoVisibility?: AlgoVisibility;
    AlgoMetaDataInformation?: AlgoMetadata;
}
