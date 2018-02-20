import { BaseAlgoParam } from './base-algo-param.model';

export interface BaseFunctionParam {
  Type?: string;
  Id?: string;
  Parameters?: BaseAlgoParam[];
}
