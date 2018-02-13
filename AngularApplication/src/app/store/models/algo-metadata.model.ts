import { BaseAlgoParam } from './base-algo-param.model';
import { BaseFunctionParam } from './base-function-param';

export interface AlgoMetadata {
  Parameters?: BaseAlgoParam[];
  Functions?: BaseFunctionParam[];
}
