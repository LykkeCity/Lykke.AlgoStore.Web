import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { SocketService } from '../../core/services/socket.service';
import * as moment from 'moment';
import ArrayUtils from '../../core/utils/array-utils';
import DateTime from '../../core/utils/date-time';
import AlgoInstanceQuote from '../../store/models/algo-instance-quote.model';
import { Candle } from './models/candle.model';
import { Function } from './models/function.model';
import { AlgoInstanceTrade } from '../../store/models/algo-instance-trade.model';
import { InstanceService } from '../../core/services/instance.service';
import { AlgoMetadata } from '../../store/models/algo-metadata.model';
import { forkJoin, Subscription } from 'rxjs';
import { IAlgoInstanceStatus } from '../../store/models/algo-instance.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges, OnDestroy {

  ready = false;
  @Input() instanceId: string;
  @Input() instanceStatus: IAlgoInstanceStatus;
  @Input() metadata: AlgoMetadata;

  chartInstance: any;
  series: any[] = [];
  legend: string[] = ['Trades', 'Candles', 'Quotes'];
  chartOptions: any;
  updateOptions: any;
  categories: string[] = [];

  chartUpdateTimeout: any;
  socketSubscriptions: Subscription[] = [];

  constructor(private socketService: SocketService,
              private instanceService: InstanceService) {

    this.chartOptions = {
      title: {
        text: 'Chart'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        data: this.legend
      },
      grid: {
        bottom: '25%'
      },
      dataZoom: [
        {
          type: 'inside',
          start: 50,
          end: 100
        },
        {
          show: true,
          type: 'slider',
          y: '90%',
          start: 50,
          end: 100
        }
      ],
      xAxis: {
        name: 'Date',
        type: 'time',
        data: this.categories,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20
      },
      yAxis: [{
        name: 'Price',
        scale: true
      }],
      series: this.series
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['instanceId'] && changes['metadata'] && changes['instanceId'].currentValue && changes['metadata'].currentValue) {
      this.socketSubscriptions.push(this.getHistoricalData().subscribe((data) => {
        this.handleHistoricalData(data);
        this.chartInstance.hideLoading();
      }));
    }


    if (changes['instanceStatus'] && changes['instanceStatus'].currentValue) {
      if (this.instanceStatus === IAlgoInstanceStatus.Running) {
        this.initSocket();
      }
    }
  }

  onChartInit(chartInstance): void {
    this.chartInstance = chartInstance;
    this.chartInstance.showLoading();
  }

  ngOnDestroy() {
    this.stopChartUpating();
  }

  private initSocket(): void {
    this.socketService.connect();
    this.socketSubscriptions.push(this.socketService.on(`instance/${this.instanceId}/candles`).subscribe((message) => {
      this.drawCandle(message);
    }));

    this.socketSubscriptions.push(this.socketService.on(`instance/${this.instanceId}/functions`).subscribe((message) => {
      this.drawFunction(message);
    }));

    this.socketSubscriptions.push(this.socketService.on(`instance/${this.instanceId}/trades`).subscribe((message) => {
      this.drawTrade(message);
    }));

    this.socketSubscriptions.push(this.socketService.on(`instance/${this.instanceId}/quotes`).subscribe((message) => {
      this.drawQuote(message);
    }));

    this.updateChart();
  }

  private drawTrade(trade: AlgoInstanceTrade): void {
    let tradesSeries = this.series.find(s => s.name === 'Trades');

    if (!tradesSeries) {
      tradesSeries = this.generateTradesSeries('Trades');
      this.series.push(tradesSeries);
    }

    const trades = tradesSeries.data;
    trade.DateOfTrade = DateTime.toChartFormat(trade.DateOfTrade);

    if (!trades.find(t => t[0] === trade.DateOfTrade)) {
      trades.push([trade.DateOfTrade, trade.Price, trade['AssetPairId'], trade.IsBuy, trade.Amount]);
      ArrayUtils.BinaryInsert(trade.DateOfTrade, this.categories);

      this.updateChart();
    }
  }

  private drawCandle(candle: Candle): void {
    let candleSeries = this.series.find(s => s.name === 'Candles');

    if (!candleSeries) {
      candleSeries = this.generateCandleSeries('Candles');
      this.series.push(candleSeries);
    }

    const candles = candleSeries.data;
    candle.DateTime = DateTime.toChartFormat(candle.DateTime);

    if (!candles.some(c => c[0] === candle.DateTime)) {
      ArrayUtils.BinaryInsert(candle.DateTime, this.categories);
      const item = [candle.DateTime, candle.Open, candle.Close, candle.Low, candle.High, candle.AssetPair];
      this.series.find(s => s.name === 'Candles').data = ArrayUtils.orderedInsertChartData(candles, item, candle.DateTime, 0);
      this.updateChart();
    }
  }

  private drawFunction(func: Function): void {
    let funcSeries = this.series.find(s => s.name === func.FunctionName);
    if (!funcSeries) {
      funcSeries = this.generateFunctionSeries(func.FunctionName);
      this.series.push(funcSeries);
      this.legend.push(func.FunctionName);
    }

    const data = funcSeries.data;
    func.CalculatedOn = DateTime.toChartFormat(func.CalculatedOn);

    if (!data.some(f => f[0] === func.CalculatedOn)) {
      ArrayUtils.BinaryInsert(func.CalculatedOn, this.categories);
      data.push([func.CalculatedOn, func.Value]);

      this.updateChart();
    }
  }

  private drawQuote(quote: AlgoInstanceQuote): void {
    let quotesSeries = this.series.find(s => s.name === 'Quotes');

    if (!quotesSeries) {
      quotesSeries = this.generateQuoteSeries('Quotes');
      this.series.push(quotesSeries);
    }

    const quotes = quotesSeries.data;
    quote.DateReceived = DateTime.toChartFormat(quote.DateReceived);

    if (!quotes.some(q => q[0] === quote.DateReceived)) {
      ArrayUtils.BinaryInsert(quote.DateReceived, this.categories);
      quotes.push([quote.DateReceived, quote.Price, quote['AssetPair'], quote.IsBuy, quote.IsOnline]);
      this.updateChart();
    }
  }

  private handleHistoricalData(data: any): void {
    const historicalTradesSeries = data[0].reverse();
    const historicalFunctionsSeries = data[1];
    const historicalQuotesSeries = data[2];
    const historicalAlgoCandlesSeries = data[3];

    for (const candle of historicalAlgoCandlesSeries) {
      this.drawCandle(candle);
    }

    for (const trade of historicalTradesSeries) {
      this.drawTrade(trade);
    }

    for (const func of historicalFunctionsSeries) {
      this.drawFunction(func);
    }

    for (const quote of historicalQuotesSeries) {
      this.drawQuote(quote);
    }

    // if we have candles for indicators
    if (data.length > 4) {
      for (let i = 3; i < data.length; i++) {
        for (const candle of data[i]) {
          this.drawCandle(candle);
        }
      }
    }
  }

  private updateChart(): void {
    clearTimeout(this.chartUpdateTimeout);

    this.chartUpdateTimeout = setTimeout(() => {
      this.updateOptions = {
        legend: {
          data: this.legend
        },
        xAxis: {
          data: [...this.categories],
          min: this.categories[0],
          max: this.categories[this.categories.length - 1],
        },
        series: this.series
      };
    }, 500);
  }

  private getHistoricalData() {
    const requests = [];

    const now = moment().toISOString();
    const instanceStartDate = moment(this.metadata.Parameters.find(p => p.Key === 'StartFrom').Value).toISOString();
    let instanceEndDate = moment(this.metadata.Parameters.find(p => p.Key === 'EndOn').Value).toISOString();
    const instanceTradedAsset = this.metadata.Parameters.find(p => p.Key === 'TradedAsset').Value;
    const instanceTimeInterval = this.metadata.Parameters.find(p => p.Key === 'CandleInterval').Value;
    const instanceAssetPair = this.metadata.Parameters.find(p => p.Key === 'AssetPair').Value;

    // check if the end date of the instance is in the past
    // no need to get data after the end date
    if (instanceStartDate < now && instanceEndDate > now) {
      instanceEndDate = now;
    }

    // all candles should be last
    requests.push(this.instanceService
      .getHistoricalTrades(this.instanceId, instanceTradedAsset, instanceStartDate, instanceEndDate));

    requests.push(this.instanceService
      .getHistoricalFunctions(this.instanceId, instanceStartDate, instanceEndDate));

    requests.push(this.instanceService
      .getHistoricalQuotes(this.instanceId, instanceAssetPair, instanceStartDate, instanceEndDate, true));

    requests.push(this.instanceService
      .getHistoricalCandles(instanceAssetPair, 3, instanceTimeInterval, instanceStartDate, instanceEndDate));

    this.metadata.Functions.forEach(func => {
      const funcCandleInterval = func.Parameters.find(p => p.Key === 'candleTimeInterval').Value;
      const funcAssetPair = func.Parameters.find(p => p.Key === 'assetPair').Value;
      const funcStartDate = moment(func.Parameters.find(p => p.Key === 'startingDate').Value).toISOString();
      let funcEndDate = moment(func.Parameters.find(p => p.Key === 'endingDate').Value).toISOString();

      // check if the end date of the instance is in the past
      // no need to get data after the end date
      if (funcStartDate < now && funcEndDate > now) {
        funcEndDate = now;
      }

      if (instanceAssetPair !== funcAssetPair || instanceTimeInterval !== funcCandleInterval) {
        requests.push(this.instanceService.getHistoricalCandles(funcAssetPair, 3, funcCandleInterval, funcStartDate, funcEndDate));
      }
    });

    return forkJoin(requests);
  }

  private stopChartUpating() {
    this.socketSubscriptions.forEach(sub => sub.unsubscribe());
    this.socketService.disconnect();
    clearTimeout(this.chartUpdateTimeout);
  }

  private generateGlobalSeries() {
    return [
      this.generateCandleSeries('Candles'),
      this.generateTradesSeries('Trades')
    ];
  }

  private generateCandleSeries(name: string) {
    const downColor = '#ec0000';
    const downBorderColor = '#8A0000';
    const upColor = '#00da3c';
    const upBorderColor = '#008F28';

    return {
      name: name,
      type: 'candlestick',
      data: [],
      itemStyle: {
        normal: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor
        }
      },
      barMaxWidth: '15%',
      tooltip: {
        formatter: (params: any) => {
          const date = params.data[0];
          const open = params.data[1];
          const close = params.data[2];
          const low = params.data[3];
          const high = params.data[4];
          const assetPair = params.data[5];
          return `
            Candle <br/>
            Date: ${date} <br/>
            AssetPair: ${assetPair} <br/>
            Open: ${open} <br/>
            Close: ${close} <br/>
            Lowest: ${low} <br/>
            Highest: ${high}
          `;
        }
      }
    };
  }

  private generateTradesSeries(name: string) {
    return {
      name: name,
      type: 'scatter',
      data: [],
      hoverAnimation: false,
      itemStyle: {
        color: 'blue'
      },
      z: 10,
      tooltip: {
        formatter: (params: any) => {
          return `Trade <br>Date: ${params.data[0]}<br>Price: ${params.data[1]}<br>AssetPair: ${params.data[2]}<br>Operation: ${params.data[3] ? 'Buy' : 'Sell'}<br> Amount: ${params.data[4]}`;
        }
      }
    };
  }

  private generateQuoteSeries(name: string) {
    return {
      name: name,
      type: 'line',
      smooth: true,
      data: [],
      lineStyle: {
        normal: { opacity: 0.5 }
      },
      z: 15,
      tooltip: {
        formatter: (params: any) => {
          const date = params.data[0];
          const price = params.data[1];
          const assetPair = params.data[2];
          const isBuy = params.data[3];
          const isOnline = params.data[4];
          return `
          Quote <br/>
            Date: ${date} <br/>
            AssetPair: ${assetPair} <br/>
            Price: ${price} <br/>
            IsBuy: ${isBuy} <br/>
            IsOnline: ${isOnline}`;
        }
      }
    };
  }

  private generateFunctionSeries(name: string) {
    return {
      name: name,
      type: 'line',
      smooth: true,
      data: [],
      z: 20,
      lineStyle: {
        normal: { opacity: 0.5 }
      }
    };
  }
}
