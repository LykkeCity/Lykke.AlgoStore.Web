import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { SocketService } from '../../core/services/socket.service';
import * as moment from 'moment';
import { DATETIME_DISPLAY_FORMAT } from '../../core/utils/date-time';
import { Candle } from './models/candle.model';
import { Function } from './models/function.model';
import { AlgoInstanceTrade } from '../../store/models/algo-instance-trade.model';
import { InstanceService } from '../../core/services/instance.service';
import { AlgoMetadata } from '../../store/models/algo-metadata.model';
import { Subscription } from 'rxjs';
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

  series: any[] = [];
  legend: string[] = ['Trades', 'Candles'];
  chartOptions: any;
  updateOptions: any;
  categories: string[] = [];

  chartUpdateInterval: any;
  socketSubscriptions: Subscription[] = [];

  constructor(private socketService: SocketService,
              private instanceService: InstanceService) {

    this.series.push(this.generateCandleSeries('Candles'));
    this.series.push(this.generateTradesSeries('Trades'));

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
        name: 'Price',
        type: 'category',
        data: this.categories,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: [{
        scale: true
      }],
      series: this.series
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['instanceId'] && changes['metadata'] && changes['instanceId'].currentValue && changes['metadata'].currentValue) {
      this.getHistoricalData().then(() => {
        this.ready = true;
        if (this.instanceStatus === IAlgoInstanceStatus.Running) {
          this.initSocket();
        }
      });
    }
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

    this.chartUpdateInterval = setInterval(() => {
      this.updateChart();
    }, 2000);
  }

  private drawTrade(trade: AlgoInstanceTrade): void {
    trade.DateOfTrade = moment(trade.DateOfTrade).format(DATETIME_DISPLAY_FORMAT);
    this.series.find(s => s.name === 'Trades')
      .data.push([trade.DateOfTrade, Number.parseInt(trade.Price), trade['AssetPairId'], trade.IsBuy, trade.Amount]);
    this.categories.push(trade.DateOfTrade);
  }

  private drawCandle(candle: Candle): void {
    candle.DateTime = moment(candle.DateTime).format(DATETIME_DISPLAY_FORMAT);
    this.series.find(s => s.name === 'Candles').data.push([candle.Open, candle.Close, candle.Low, candle.High]);
    this.categories.push(candle.DateTime);
  }

  drawFunction(func: Function): void {
    const hasSeries = this.series.find(s => s.name === func.FunctionName);
    if (!hasSeries) {
      this.series.push(this.generateFunctionSeries(func.FunctionName));
    }

    this.series.find(s => s.name === func.FunctionName).data.push(func.Value);
    func.CalculatedOn = moment(func.CalculatedOn).format(DATETIME_DISPLAY_FORMAT);
    this.categories.push(func.CalculatedOn);
    this.legend.push(func.FunctionName);
  }

  private updateChart(): void {
    this.updateOptions = {
      legend: {
        data: this.legend
      },
      xAxis: {
        data: this.categories
      },
      series: this.series
    };
  }

  private async getHistoricalData() {
    return new Promise((resolve, reject) => {
      const instanceStartDate = moment(this.metadata.Parameters.find(p => p.Key === 'StartFrom').Value).toISOString();
      const instanceTradedAsset = this.metadata.Parameters.find(p => p.Key === 'TradedAsset').Value;
      const instanceAssetPair = this.metadata.Parameters.find(p => p.Key === 'AssetPair').Value;
      const timeInterval = this.metadata.Parameters.find(p => p.Key === 'CandleInterval').Value;

      const historicalDataPromises = [];
      historicalDataPromises.push(
        this.instanceService.getHistoricalCandles(instanceAssetPair, 3, timeInterval, instanceStartDate, now).toPromise());
      historicalDataPromises.push(
        this.instanceService.getHistoricalTrades(this.instanceId, instanceTradedAsset, instanceStartDate, now).toPromise());
      historicalDataPromises.push(
        this.instanceService.getHistoricalFunctions(this.instanceId, instanceStartDate, now).toPromise());

      Promise.all(historicalDataPromises).then((data) => {
        console.log(data);
        this.updateChart();
        const historicalCandlesSeries = data[0];
        const historicalTradesSeries = data[1].reverse();
        const historicalFunctionsSeries = data[2];

        for (const candle of historicalCandlesSeries) {
          this.drawCandle(candle);
        }

        for (const trade of historicalTradesSeries) {
          this.drawTrade(trade);
        }

        for (const func of historicalFunctionsSeries) {
          this.drawFunction(func);
        }

        resolve();
      });
    });
  }

  private stopChartUpating() {
    this.socketSubscriptions.forEach(sub => sub.unsubscribe());
    this.socketService.disconnect();
    clearInterval(this.chartUpdateInterval);
  }

  private generateGlobalSeries() {
    return [
      this.generateCandleSeries('Candles'),
      this.generateTradesSeries('Trades')
    ];
  }

  private generateCandleSeries(name: string) {
    const upColor = '#ec0000';
    const upBorderColor = '#8A0000';
    const downColor = '#00da3c';
    const downBorderColor = '#008F28';

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
      }
    };
  }

  private generateTradesSeries(name: string) {
    return {
      name: name,
      type: 'scatter',
      data: [],
      hoverAnimation: false,
      // symbolSize: [2, 40],
      itemStyle: {
        color: 'blue'
      },
      tooltip: {
        formatter: (params: any) => {
          return `Trade <br>Date: ${params.data[0]}<br>Price: ${params.data[1]}<br>AssetPair: ${params.data[2]}<br>Operation: ${params.data[3] ? 'Buy' : 'Sell'}<br> Amount: ${params.data[4]}`;
        }
      }
    };
  }

  private generateFunctionSeries(name: string) {
    return {
      name: name,
      type: 'line',
      smooth: true,
      // yAxisIndex: 1,
      data: [],
      lineStyle: {
        normal: { opacity: 0.5 }
      }
    };
  }
}
