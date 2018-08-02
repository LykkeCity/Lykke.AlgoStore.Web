import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ChartsService } from '../../core/services/charts.service';
import { SocketService } from '../../core/services/socket.service';
import { AlgoInstanceTrade } from '../../store/models/algo-instance-trade.model';
import ChartTrade from './models/chart-trade.model';

import * as moment from 'moment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges, OnDestroy {

  chartOptions: any;
  updateOptions: any;
  categories: string[] = [];
  @Input() instanceId: string;

  chartTrades: any[] = [];
  macd: any[] = [];

  constructor(private chartsService: ChartsService,
              private socketService: SocketService) {
    this.chartOptions = {
      title: {
        text: 'Trades chart'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Trades', 'Candles', 'MA5', 'MA15', 'MA25', 'MA30']
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
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
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
      yAxis: {
        scale: true
      },
      series: [
        // {
        //   name: 'Candles',
        //   type: 'candlestick',
        //   data: this.getCandleData().values,
        //   itemStyle: {
        //     normal: {
        //       color: upColor,
        //       color0: downColor,
        //       borderColor: upBorderColor,
        //       borderColor0: downBorderColor
        //     }
        //   },
        // },
        // {
        //   name: 'MA5',
        //   type: 'scatter',
        //   data: this.calculateMA(5),
        //   smooth: true,
        //   lineStyle: {
        //     normal: { opacity: 0.5 }
        //   }
        // },
        // {
        //   name: 'MA15',
        //   type: 'line',
        //   data: this.calculateMA(15),
        //   smooth: true,
        //   lineStyle: {
        //     normal: { opacity: 0.5 }
        //   }
        // },
        {
          name: 'MA25',
          type: 'line',
          data: this.macd,
          smooth: true,
          lineStyle: {
            normal: { opacity: 0.5 }
          }
        },
        {
          name: 'Trades',
          type: 'scatter',
          data: this.chartTrades,
          hoverAnimation: false,
          symbolSize: [1, 40],
          tooltip: {
            formatter: '{b0}: {c0}<br />{b1}: {c1}'
          }
        }
      ]
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['instanceId'] && changes['instanceId'].currentValue) {
      this.initSocket();
    }
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  private initSocket(): void {
    this.socketService.connect(`/candles?instanceId=${this.instanceId}`);
    this.socketService.on('message', (message) => {
      console.log('in chart');
      console.log(message);
      this.drawTrade(message.data);
    });

    this.dummyData();
  }

  private drawTrade(trade: string): void {
    const temp = JSON.parse(trade);
    temp.DateOfTrade = moment(temp.DateOfTrade).format('YYYY-MM-DD HH:mm:ss');
    this.chartTrades.push([temp.DateOfTrade, Number.parseInt(temp.Price)]);
    this.categories.push(temp.DateOfTrade);

    const macdValue = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
    this.macd.push([temp.DateOfTrade, macdValue]);

    this.updateOptions = {
      xAxis: {
        data: this.categories
      },
      series: [{
        data: this.macd
      },
        {
          data: this.chartTrades
        }]
    };
  }

  private dummyData() {

    let counter = 0;
    let value = 0;
    setInterval(() => {
      counter++;
      value = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
      this.drawTrade(`{"DateOfTrade":"2017-05-${counter}","Price":"${value}"}`);

      // const macdValue = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
      // this.macd.push([`2017-05-${counter} 00:00:00`, macdValue]);

      this.updateOptions = {
        xAxis: {
          data: this.categories
        },
        series: [{
          data: this.macd
        },
          {
          data: this.chartTrades
        }]
      };
    }, 1500);
  }
}
