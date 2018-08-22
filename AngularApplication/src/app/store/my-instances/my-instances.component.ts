import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { InstanceService } from '../../core/services/instance.service';
import { AlgoInstance, IAlgoInstanceType } from '../models/algo-instance.model';

@Component({
  selector: 'app-my-instances',
  templateUrl: './my-instances.component.html',
  styleUrls: ['./my-instances.component.scss']
})
export class MyInstancesComponent implements OnDestroy {

  subscriptions: Subscription[] = [];
  loadingIndicator = true;
  instancesCount: number;
  instances: any = {};
  temp: any = {};
  iAlgoInstanceType = IAlgoInstanceType;

  typing: any;
  doneTypingInterval: number;

  constructor(private instancesService: InstanceService) {
    this.doneTypingInterval = 1000;
    this.subscriptions.push(this.instancesService.getUserInstances().subscribe(data => {
      this.instancesCount = data.length;
      this.instances[IAlgoInstanceType.Live] = [];
      this.instances[IAlgoInstanceType.Test] = [];
      this.instances[IAlgoInstanceType.Demo] = [];

       data.forEach(instance => {
         this.instances[instance.InstanceType].push(instance);
       });

       this.temp = { ...this.instances };
       this.loadingIndicator = false;

    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private search(val: any, type: IAlgoInstanceType) {
    clearTimeout(this.typing);

    this.typing = setTimeout(() => {

      let result = this.temp[type].filter((instance: AlgoInstance) => {
        return instance.InstanceName.toLocaleLowerCase().indexOf(val) !== -1
          || instance.Sta
          || !val;
      });

      if (type === this.iAlgoInstanceType.Live) {
        result = this.temp[type].filter((instance) => {
          return instance.Wallet.Name.toLocaleLowerCase().indexOf(val) !== -1;
        });
      }

      this.instances[type] = [...result];

    }, this.doneTypingInterval);
  }

  updateFilterLive(event) {
    const val = event.target.value.toLowerCase();

    this.search(val, this.iAlgoInstanceType.Live);
  }

  updateFilterDemo(event) {
    const val = event.target.value.toLowerCase();

    this.search(val, this.iAlgoInstanceType.Demo);
  }

  updateFilterTest(event) {
    const val = event.target.value.toLowerCase();

    this.search(val, this.iAlgoInstanceType.Test);
  }
}
