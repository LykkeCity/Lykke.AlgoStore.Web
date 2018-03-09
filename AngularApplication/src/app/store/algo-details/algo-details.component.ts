import {Component, OnDestroy, OnInit} from '@angular/core';
import {Algo} from '../models/algo.interface';
import {StoreService} from '../../services/store.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {BaseAlgoParam} from '../models/base-algo-param.model';
import {AlgoRating} from '../models/algo-rating.model';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-algo-detail',
  templateUrl: './algo-details.component.html',
  styleUrls: ['./algo-details.component.scss']
})
export class AlgoDetailsComponent implements OnInit, OnDestroy {

  algo: Algo = {};
  subsctiptions: Subscription[] = [];
  editor: any;
  myRating: AlgoRating = {};

  constructor(private storeService: StoreService, private route: ActivatedRoute, private notificationsService: NotificationsService) {

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

  highlight(meta: BaseAlgoParam): void {
    this.editor.find(meta.Key);
    this.editor.setHighlightActiveLine(true);
  }

  onEditorCreated(editor: any): void {
    this.editor = editor;
  }

  onRatingChange(data) {
    const ratingData = {
      AlgoId: this.algo['AlgoId'],
      Rating: data.rating
    };
    this.storeService.saveAlgoRating(ratingData).subscribe((newAlgoRating) => {
      this.notificationsService.success('Success', 'Rating saved.');
      this.algo.Rating = newAlgoRating.Rating;
      this.algo.RatedUsersCount = newAlgoRating.RatedUsersCount;
    });
  }

}
