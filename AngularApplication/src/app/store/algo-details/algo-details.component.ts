import {Component, OnDestroy, OnInit} from '@angular/core';
import {Algo} from '../models/algo.interface';
import {StoreService} from '../../services/store.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {BaseAlgoParam} from '../models/base-algo-param.model';
import {AlgoRating} from '../models/algo-rating.model';

@Component({
  selector: 'app-algo-detail',
  templateUrl: './algo-details.component.html',
  styleUrls: ['./algo-details.component.scss']
})
export class AlgoDetailsComponent implements OnInit, OnDestroy {

  algo: Algo = {};
  subsctiptions: Subscription[] = [];
  editor: any;
  myRating: AlgoRating;

  constructor(private storeService: StoreService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subsctiptions.push(this.route.params.subscribe(params => {
      const algoId = params['algoId'];
      const clientId = params['clientId'];
      this.subsctiptions.push(this.storeService.getAlgoWithSource(algoId, clientId).subscribe(algo => {
        this.algo = algo;
        this.algo.ClientId = clientId;
      }));

      this.subsctiptions.push(this.storeService.getUserAlgoRating(algoId).subscribe(rating => {
        this.myRating = rating;
      }));
    }));
  }

  ngOnDestroy() {
    this.subsctiptions.forEach(sub => {
      sub.unsubscribe();
    });
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
