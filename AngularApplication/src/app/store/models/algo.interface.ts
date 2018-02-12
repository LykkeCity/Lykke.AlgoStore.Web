import { AlgoMetadata } from './algo-metadata.model';

export interface Algo {
    Id?: string;
    Name?: string;
    Description?: string;
    Date?: string;
    Status?: string;
    Author?: string;
    UsersCount?: string;
    Rating?: string;
    Data?: string;
    AlgoMetaDataInformation?: AlgoMetadata;
}