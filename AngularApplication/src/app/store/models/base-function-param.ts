import { BaseAlgoParam } from './base-algo-param.model';

export interface BaseFunctionParam {
  _type?:string;
  id?: string;
  Params?: BaseAlgoParam[];
}
