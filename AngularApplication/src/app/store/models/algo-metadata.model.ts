import { BaseAlgoParam } from './base-algo-param.model';
import { BaseFunctionParam } from './base-function-param';

export interface AlgoMetadata {
  Parameters?: BaseAlgoParam[];
  Functions?: BaseFunctionParam[];
}


export function getDefaultMetaData(): AlgoMetadata {
  return {
    "Parameters": [
      {
        "Key": "AssetPair",
        "Value": "USDBTC",
        "Type": "String",
        "FunctionType": "Lykke.AlgoStore.CSharp.Funct.SimpleMovingAverage"
      },
      {
        "Key": "meta2",
        "Value": "Val 1",
        "Type": "String",
        "FunctionType": "Lykke.AlgoStore.CSharp.Funct.SimpleMovingAverage"
      },
      {
        "Key": "MY_VAR",
        "Value": "Val 1",
        "Type": "String",
        "FunctionType": "Lykke.AlgoStore.CSharp.Funct.SimpleMovingAverage"
      }
    ],

    "Functions": [
      {
        "Type":"Lykke.AlgoStore.CSharp.Funct.SimpleMovingAverage",
        "Id": "SMA_Short",
        "Parameters": [
          {
            "Key": "StartingFrom",
            "Value": "2011-05-10",
            "Type": "DateTime",
            "FunctionType": "Lykke.AlgoStore.CSharp.Funct.SimpleMovingAverage"
          },
          {
            "Key": "CandlePeriod",
            "Value": "5",
            "Type": "int",
            "FunctionType": "Lykke.AlgoStore.CSharp.Funct.SimpleMovingAverage"
          }
        ]
      },
      {
        "Type": "Lykke.AlgoStore.CSharp.Funct.SimpleMovingAverage",
        "Id": "SMA_Long",
        "Parameters": [
          {
            "Key": "StartingFrom",
            "Value": "2001-05-10",
            "Type": "String",
            "FunctionType": "Lykke.AlgoStore.CSharp.Funct.SimpleMovingAverage"
          },
          {
            "Key": "CandlePeriod",
            "Value": "Min",
            "Type": "String",
            "FunctionType": "Lykke.AlgoStore.CSharp.Funct.SimpleMovingAverage"
          }
        ]
      }
    ]
  };
}
