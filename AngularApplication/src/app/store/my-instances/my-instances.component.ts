import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { InstanceService } from '../../services/instance.service';
import { IAlgoInstanceType } from '../models/algo-instance.model';
import { environment } from '../../../environments/environment';

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
  walletUrl = environment.walletApiUrl;

  constructor(private instancesService: InstanceService) {
    this.subscriptions.push(this.instancesService.getUserInstances().subscribe(data => {
      this.instancesCount = data.length;
       data.forEach(instance => {
         if (!this.instances[instance.InstanceType]) {
           this.instances[instance.InstanceType] = [];
         }

         this.instances[instance.InstanceType].push(instance);
       });

       this.loadingIndicator = false;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
