import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from '../services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Algo } from '../store/models/algo.interface';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnDestroy {

  algo: Algo = {};
  subscriptions: Subscription[] = [];

  constructor(private storeService: StoreService,
              private route: ActivatedRoute,
              private notificationsService: NotificationsService,
              private ref: ChangeDetectorRef,
              private router: Router) {

    this.subscriptions.push(this.route.params.subscribe(params => {
      const id = params['id'];

      this.subscriptions.push(this.storeService.algoGetMetadata(id).subscribe((algo) => {
        this.algo = algo;
      }));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onCodeUpdate(code: string): void {
    this.algo.Data = code;
    this.ref.detectChanges();
  }

  save(): void {
    this.subscriptions.push(this.storeService.algoSave(this.algo['AlgoId'], this.algo.Data).subscribe(() => {
      this.notificationsService.success('Success', 'Also source saved');
      this.router.navigate(['store/algo-list']);
    }));
  }
}
