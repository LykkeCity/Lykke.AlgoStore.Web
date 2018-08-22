export interface Candle {
  AssetPair?: string;
  InstanceId?: string;
  DateTime?: string;
  Open?: number;
  Close?: number;
  High?: number;
  Low?: number;
  TradingVolume?: number;
  TradingOppositeVolume?: number;
  LastTradePrice?: number;
}
