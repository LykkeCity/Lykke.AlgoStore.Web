import { Component, OnDestroy, OnInit } from '@angular/core';
import { Algo } from '../models/algo.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BaseAlgoParam } from '../models/base-algo-param.model';
import { AlgoRating } from '../models/algo-rating.model';
import { NotificationsService } from 'angular2-notifications';
import { AlgoComment } from '../../models/algo-comment.model';
import { AlgoService } from '../../services/algo.service';
import { AlgoRatingService } from '../../services/algo-rating.service';
import { AlgoCommentService } from '../../services/algo-comment.service';

@Component({
  selector: 'app-algo-detail',
  templateUrl: './algo-details.component.html',
  styleUrls: ['./algo-details.component.scss']
})
export class AlgoDetailsComponent implements OnInit, OnDestroy {

  algo: Algo = {};
  subscriptions: Subscription[] = [];
  editor: any;
  myRating: AlgoRating = {};
  comments: AlgoComment[] = [];

  constructor(
    private algoService: AlgoService,
    private algoRatingService: AlgoRatingService,
    private algoCommentService: AlgoCommentService,
    private route: ActivatedRoute,
    private notificationsService: NotificationsService) {

  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      const algoId = params['algoId'];
      const clientId = params['clientId'];
      this.subscriptions.push(this.algoService.getAlgoWithSource(algoId, clientId).subscribe(algo => {
        this.algo = algo;
        this.algo.ClientId = clientId;
      }));

      this.subscriptions.push(this.algoRatingService.getUserAlgoRating(algoId).subscribe(rating => {
        this.myRating = rating;
      }));

      this.subscriptions.push(this.algoCommentService.getAlgoComments(algoId).subscribe((comments) => {
        this.comments = comments;
      }));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
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
      AlgoId: this.algo.AlgoId,
      Rating: data.rating
    };
    this.subscriptions.push(this.algoRatingService.saveAlgoRating(ratingData).subscribe((newAlgoRating) => {
      this.notificationsService.success('Success', 'Rating saved.');
      this.algo.Rating = newAlgoRating.Rating;
      this.algo.RatedUsersCount = newAlgoRating.RatedUsersCount;
    }));
  }

}
