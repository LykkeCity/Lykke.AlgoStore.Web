import { Component, OnDestroy, OnInit } from '@angular/core';
import { Algo } from '../models/algo.interface';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BaseAlgoParam } from '../models/base-algo-param.model';

@Component({
  selector: 'app-algo-detail',
  templateUrl: './algo-details.component.html',
  styleUrls: ['./algo-details.component.scss']
})
export class AlgoDetailsComponent implements OnInit, OnDestroy {

  algo: Algo = {};
  getAlgoSubscription: Subscription;
  routeParamsSubscription: Subscription;
  editor: any;

  constructor(private storeService: StoreService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      const algoId = params['algoId'];
      const clientId = params['clientId'];
      this.getAlgoSubscription = this.storeService.getAlgoById(clientId, algoId).subscribe(algo => {
        this.algo = algo;
      });
    });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.getAlgoSubscription.unsubscribe();
  }

  tryAlgo(): void {
    console.log(this.algo);
  }

  highlight(meta: BaseAlgoParam): void {
    this.editor.find(meta.Key);
    this.editor.setHighlightActiveLine(true);
  }

  onEditorCreated(editor: any): void {
    this.editor = editor;
  }

}
