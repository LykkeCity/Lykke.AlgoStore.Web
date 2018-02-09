import { BaseAlgoParam } from './base-algo-param.model';
import { BaseFunctionParam } from './base-function-param';

export interface AlgoMetadata {
  Params?: BaseAlgoParam[];
  Functions?: BaseFunctionParam[];
}


export function getDefaultMetaData(): AlgoMetadata {
  return {
    "Params": [
      {
        "Key": "AssetPair",
        "Value": "USDBTC",
        "Type": "String"
      },
      {
        "Key": "meta2",
        "Value": "Val 1",
        "Type": "String"
      },
      {
        "Key": "MY_VAR",
        "Value": "Val 1",
        "Type": "String"
      }
    ],

    "Functions": [
      {
        "_type": "Lykke.AlgoStore.CSharp.Funct.SimpleMovingAverage",
        "id": "SMA_Short",
        "Params": [
          {
            "Key": "StartingFrom",
            "Value": "2011-05-10",
            "Type": "DateTime"
          },
          {
            "Key": "CandlePeriod",
            "Value": "5",
            "Type": "int"
          }
        ]
      },
      {
        "_type": "Lykke.AlgoStore.CSharp.Funct.SimpleMovingAverage",
        "id": "SMA_Long",
        "Params": [
          {
            "Key": "StartingFrom",
            "Value": "2001-05-10",
            "Type": "String"
          },
          {
            "Key": "CandlePeriod",
            "Value": "Min",
            "Type": "String"
          }
        ]
      }
    ]
  };
}
