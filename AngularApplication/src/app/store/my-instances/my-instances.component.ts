import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { InstanceService } from '../../core/services/instance.service';
import { IAlgoInstanceType } from '../models/algo-instance.model';

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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    clearTimeout(this.typing);

    this.typing = setTimeout(() => {

      const tempLive = this.temp[IAlgoInstanceType.Live].filter((instance) => {
        return instance.InstanceName.toLocaleLowerCase().indexOf(val) !== -1
          || instance.Wallet.Name.toLocaleLowerCase().indexOf(val) !== -1
          || !val;
      });

      this.instances[IAlgoInstanceType.Live] = [...tempLive];

    }, this.doneTypingInterval);
  }
}
