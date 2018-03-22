import { Component, Input, OnInit } from '@angular/core';
import { AlgoComment } from '../../../models/algo-comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { AlgoCommentEditPopupComponent } from './algo-comment-edit-popup/algo-comment-edit-popup.component';
import { StoreService } from '../../../services/store.service';
import { NotificationsService } from 'angular2-notifications';
import { PopupComponent } from '../../../components/popup/popup.component';

@Component({
  selector: 'app-algo-comments',
  templateUrl: './algo-comments.component.html',
  styleUrls: ['./algo-comments.component.scss']
})
export class AlgoCommentsComponent implements OnInit {

  @Input() comments: AlgoComment[];
  @Input() algoId: string;
  commentForm: FormGroup;

  constructor(private fb: FormBuilder, private bsModalService: BsModalService, private storeService: StoreService, private notificationsService: NotificationsService) {
    this.commentForm = this.fb.group({
      Content: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  editComment(comment: AlgoComment, index: number): void {
    const initialState = {
      comment: comment,
      onEditSuccess: (editedComment) => {
        console.log(editedComment);
        this.storeService.editComment(editedComment).subscribe(savedComment => {
          this.notificationsService.success('Success', 'Comment edited successfully.');
          this.comments[index] = savedComment;
        });
      }
    };

    this.bsModalService.show(AlgoCommentEditPopupComponent, { initialState, class: 'modal-sm' });
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

    this.bsModalService.show(PopupComponent, { initialState, class: 'modal-sm' });
  }

  onCommentSubmit(): void {
    if (this.commentForm.invalid) {
      return;
    }

    this.storeService.saveComment({ AlgoId: this.algoId, ...this.commentForm.value }).subscribe((savedComment) => {
      this.notificationsService.success('Success', 'Comment added successfully.');
      this.comments.push(savedComment);
    });
  }

}
