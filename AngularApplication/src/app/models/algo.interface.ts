import { AlgoMetadata } from '../store/models/algo-metadata.model';

export interface Algo {
    Id?: string;
    Name: string;
    Description?: string;
    Date?: string;
    Status?: string;
    Author?: string;
    UsersCount?: string;
    Rating?: string;
    AlgoMetaDataInformation?: AlgoMetadata;
}
