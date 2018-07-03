import { Component, OnDestroy, OnInit } from '@angular/core';
import { Algo, AlgoVisibility } from '../models/algo.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseAlgoParam } from '../models/base-algo-param.model';
import { AlgoRating } from '../models/algo-rating.model';
import { NotificationsService } from 'angular2-notifications';
import { AlgoComment } from '../../models/algo-comment.model';
import { AlgoService } from '../../services/algo.service';
import { AlgoRatingService } from '../../services/algo-rating.service';
import { AlgoCommentService } from '../../services/algo-comment.service';
import { UserService } from '../../services/user.service';
import Permissions from '../models/permissions';
import { AlgoDuplicatePopupComponent } from '../my-algos/algo-duplicate-popup/algo-duplicate-popup.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-algo-detail',
  templateUrl: './algo-details.component.html',
  styleUrls: ['./algo-details.component.scss']
})
export class AlgoDetailsComponent implements OnInit, OnDestroy {

  permissions: {
    canSeeComments: boolean,
    canSeeAlgoRating: boolean,
    canEditAlgoRating: boolean,
    canRunInstance: boolean,
    canDuplicate: boolean
  };
  algo: Algo;
  subscriptions: Subscription[] = [];
  editor: any;
  myRating: AlgoRating = {};
  comments: AlgoComment[] = [];
  modalRef: BsModalRef;
  iAlgoVisibility = AlgoVisibility;

  constructor(
    private algoService: AlgoService,
    private algoRatingService: AlgoRatingService,
    private algoCommentService: AlgoCommentService,
    private route: ActivatedRoute,
    private router: Router,
    private bsModalService: BsModalService,
    private notificationsService: NotificationsService,
    private userService: UserService) {

    this.permissions = {
      canEditAlgoRating: this.userService.hasPermission(Permissions.RATE_ALGO),
      canSeeAlgoRating: this.userService.hasPermission(Permissions.GET_ALGO_RATING),
      canSeeComments: this.userService.hasPermission(Permissions.GET_ALL_COMMENTS_FOR_ALGO),
      canRunInstance: this.userService.hasPermission(Permissions.SAVE_ALGO_INSTANCE_DATA)
      && this.userService.hasPermission(Permissions.DEPLOY_BINARY_FILE),
      canDuplicate: this.userService.hasPermission(Permissions.CREATE_ALGO)
    };
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      const algoId = params['algoId'];
      const clientId = params['clientId'];
      this.subscriptions.push(this.algoService.getAlgoWithSource(algoId, clientId).subscribe(algo => {
        this.algo = algo;
        this.algo.ClientId = clientId;
      }, () => {
        this.router.navigate(['/store/algo-list']);
      }));

      if (this.permissions.canSeeAlgoRating) {
        this.subscriptions.push(this.algoRatingService.getUserAlgoRating(algoId).subscribe(rating => {
          this.myRating = rating;
        }));
      }

      if (this.permissions.canSeeComments) {
        this.subscriptions.push(this.algoCommentService.getAlgoComments(algoId).subscribe((comments) => {
          this.comments = comments;
        }));
      }
    }));
  }

  ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.hide();
    }

    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  duplicate() {
    if (!this.permissions.canDuplicate) {
      return;
    }

    const initialState = {
      algo: this.algo,
      onCreateSuccess: () => {
        this.router.navigate(['/store/algo-list']);
      }
    };

    this.modalRef = this.bsModalService.show(AlgoDuplicatePopupComponent, {
      initialState,
      class: 'modal-sm',
      keyboard: false,
      ignoreBackdropClick: true
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
    if (this.permissions.canEditAlgoRating) {
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

}
