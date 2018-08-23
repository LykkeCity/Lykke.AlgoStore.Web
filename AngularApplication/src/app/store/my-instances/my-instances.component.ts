import { Component, OnDestroy, ViewChild } from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { InstanceService } from '../../core/services/instance.service';
import { AlgoInstance, IAlgoInstanceType } from '../models/algo-instance.model';

@Component({
  selector: 'app-my-instances',
  templateUrl: './my-instances.component.html',
  styleUrls: ['./my-instances.component.scss']
})
export class MyInstancesComponent implements OnDestroy {

  @ViewChild('instanceTabs') staticTabs: TabsetComponent;
  subscriptions: Subscription[] = [];
  loadingIndicator = true;
  instancesCount: number;
  instances: any = {};
  temp: any = {};
  iAlgoInstanceType = IAlgoInstanceType;

  typing: any;
  heading = 'Live';
  hasTabLoader: boolean;
  doneTypingInterval: number;

  liveCount: number;
  demoCount: number;
  testCount: number;

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

       this.liveCount = this.instances[this.iAlgoInstanceType.Live].length;
       this.demoCount = this.instances[this.iAlgoInstanceType.Demo].length;
       this.testCount = this.instances[this.iAlgoInstanceType.Test].length;

       this.temp = { ...this.instances };
       this.loadingIndicator = false;

    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private search(val: any, type: IAlgoInstanceType) {
    clearTimeout(this.typing);
    this.hasTabLoader = true;
    this.disableTabs();

    console.log(this.hasTabLoader);
    console.log(this.heading);
    this.typing = setTimeout(() => {

      let result;

      if (type === this.iAlgoInstanceType.Live) {
        result = this.temp[type].filter((instance) => {
          return instance.InstanceName.toLocaleLowerCase().indexOf(val) !== -1
            || (instance.RunDate && instance.RunDate.indexOf(val) !== -1)
            || (instance.StopDate && instance.StopDate.indexOf(val) !== -1)
            || (instance.CreateDate && instance.CreateDate.indexOf(val) !== -1)
            || instance.Wallet.Name.toLocaleLowerCase().indexOf(val) !== -1
            || !val;
        });
      } else {
        result = this.temp[type].filter((instance: AlgoInstance) => {
          return instance.InstanceName.toLocaleLowerCase().indexOf(val) !== -1
            || (instance.RunDate && instance.RunDate.indexOf(val) !== -1)
            || (instance.StopDate && instance.StopDate.indexOf(val) !== -1)
            || (instance.CreateDate && instance.CreateDate.indexOf(val) !== -1)
            || !val;
        });
      }

      this.instances[type] = [...result];
      this.staticTabs.tabs.forEach(tab => tab.disabled = false);

      this.enableTabs();
      this.hasTabLoader = false;
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

  onSelect(tab: TabDirective) {
    if (tab.customClass) {
      this.heading = tab.customClass;
    }
  }

  private disableTabs(): void {
    this.staticTabs.tabs.forEach(tab => tab.disabled = true);
  }

  private enableTabs(): void {
    this.staticTabs.tabs.forEach(tab => tab.disabled = false);
  }
}
