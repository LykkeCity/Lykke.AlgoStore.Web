import { Component, Input } from '@angular/core';
import { AlgoComment } from '../../../models/algo-comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { AlgoCommentEditPopupComponent } from './algo-comment-edit-popup/algo-comment-edit-popup.component';
import { StoreService } from '../../../services/store.service';
import { NotificationsService } from 'angular2-notifications';
import { PopupComponent } from '../../../components/popup/popup.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-algo-comments',
  templateUrl: './algo-comments.component.html',
  styleUrls: ['./algo-comments.component.scss'],
  animations: [
    trigger('collapse', [
      state('open', style({
        opacity: '1',
        display: 'block',
        transform: 'translate3d(0, 0, 0)'
      })),
      state('closed',   style({
        opacity: '0',
        display: 'none',
        transform: 'translate3d(0, -10px, 0)'
      })),
      transition('closed => open', animate('200ms ease-in')),
      transition('open => closed', animate('100ms ease-out'))
    ])
  ]
})
export class AlgoCommentsComponent {

  @Input() comments: AlgoComment[];
  @Input() algoId: string;
  commentForm: FormGroup;
  currentPage = 1;
  collapse = 'open';

  constructor(private fb: FormBuilder, private bsModalService: BsModalService, private storeService: StoreService, private notificationsService: NotificationsService) {
    this.commentForm = this.fb.group({
      Content: ['', Validators.required]
    });
  }

  editComment(comment: AlgoComment, index: number): void {
    const initialState = {
      comment: comment,
      onEditSuccess: (editedComment) => {
        this.storeService.editComment(editedComment).subscribe(savedComment => {
          this.notificationsService.success('Success', 'Comment edited successfully.');
          this.comments[index] = savedComment;
        });
      }
    };

    this.bsModalService.show(AlgoCommentEditPopupComponent, { initialState, class: 'modal-sm', keyboard: false, ignoreBackdropClick: true });
  }

  deleteComment(comment: AlgoComment, index: number): void {
    const initialState = {
      popupConfig: {
        title: 'Delete comment',
        text: 'Are you sure you want to delete this comment?',
        btnCancelText: 'Cancel',
        btnConfirmText: 'Delete',
        successCallback: () => {
          this.storeService.deleteComment(this.algoId, comment.CommentId).subscribe(() => {
            this.comments.splice(index, 1);
            this.notificationsService.success('Success', 'Comment deleted successfully');
          });
        }
      }
    };

    this.bsModalService.show(PopupComponent, { initialState, class: 'modal-sm', keyboard: false, ignoreBackdropClick: true });
  }

  onCommentSubmit(): void {
    if (this.commentForm.invalid) {
      return;
    }

    this.storeService.saveComment({ AlgoId: this.algoId, ...this.commentForm.value }).subscribe((savedComment) => {
      this.notificationsService.success('Success', 'Comment added successfully.');
      this.comments.unshift(savedComment);
      this.commentForm.reset();
    });
  }

  toggleCollapse() {
    this.collapse = this.collapse === 'open' ? 'closed' : 'open';
  }

}
