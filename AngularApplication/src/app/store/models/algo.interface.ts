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
    DateCreated?: string;
    DateModified?: string;
    DatePublished?: string;
    Status?: string;
    Author?: string;
    UsesCount?: string;
    Rating?: number;
    RatedUsersCount?: number;
    Content?: string;
    AlgoVisibility?: AlgoVisibility;
    AlgoMetaDataInformation?: AlgoMetadata;
}
