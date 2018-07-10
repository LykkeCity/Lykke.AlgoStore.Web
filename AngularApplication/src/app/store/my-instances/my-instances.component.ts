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
  iAlgoInstanceType = IAlgoInstanceType;

  constructor(private instancesService: InstanceService) {
    this.subscriptions.push(this.instancesService.getUserInstances().subscribe(data => {
      this.instancesCount = data.length;
      this.instances[IAlgoInstanceType.Live] = [];
      this.instances[IAlgoInstanceType.Test] = [];
      this.instances[IAlgoInstanceType.Demo] = [];

       data.forEach(instance => {
         this.instances[instance.InstanceType].push(instance);
       });

       this.loadingIndicator = false;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
