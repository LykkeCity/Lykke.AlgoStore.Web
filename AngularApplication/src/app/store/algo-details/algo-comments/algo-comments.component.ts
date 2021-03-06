import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AlgoComment } from '../../../models/algo-comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AlgoCommentEditPopupComponent } from './algo-comment-edit-popup/algo-comment-edit-popup.component';
import { NotificationsService } from 'angular2-notifications';
import { PopupComponent } from '../../../components/popup/popup.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { AlgoCommentService } from '../../../core/services/algo-comment.service';
import { UserService } from '../../../core/services/user.service';
import Permissions from '../../models/permissions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-algo-comments',
  templateUrl: './algo-comments.component.html',
  styleUrls: ['./algo-comments.component.scss'],
  animations: [
    trigger('collapse', [
      state('open', style({
        opacity: '1',
        display: 'block',
        transform: 'translate(0, 0)'
      })),
      state('closed', style({
        opacity: '0',
        display: 'none',
        transform: 'translate(0, -10px)'
      })),
      transition('closed => open', animate('200ms ease-in')),
      transition('open => closed', animate('100ms ease-out'))
    ])
  ]
})
export class AlgoCommentsComponent implements OnChanges, OnDestroy {

  @Input() comments: AlgoComment[];
  @Input() algoId: string;
  commentForm: FormGroup;
  currentPage = 1;
  collapse = 'open';
  loader = false;

  permissions: {
    canCreateComment: boolean,
    canEditComment: boolean,
    canDeleteComment: boolean
  };

  subscriptions: Subscription[] = [];
  modalRef: BsModalRef;

  constructor(private fb: FormBuilder,
              private bsModalService: BsModalService,
              private algoCommentService: AlgoCommentService,
              private notificationsService: NotificationsService,
              private domSanitizer: DomSanitizer,
              private userService: UserService) {
    this.commentForm = this.fb.group({
      Content: ['', Validators.required]
    });

    this.permissions = {
      canCreateComment: this.userService.hasPermission(Permissions.CREATE_COMMENT),
      canEditComment: this.userService.hasPermission(Permissions.EDIT_COMMENT),
      canDeleteComment: this.userService.hasPermission(Permissions.DELETE_COMMENT)
    };
  }

  ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.hide();
    }

    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['comments'] && changes['comments'].currentValue) {
      this.comments = changes['comments'].currentValue.map(comment => {
        comment.Content = this.domSanitizer.bypassSecurityTrustHtml(comment.Content);
        return comment;
      });
    }
  }

  editComment(comment: AlgoComment, index: number): void {
    if (!this.permissions.canEditComment) {
      return;
    }

    const initialState = {
      comment: comment,
      onEditSuccess: (editedComment) => {
        this.subscriptions.push(this.algoCommentService.editComment(editedComment).subscribe(savedComment => {
          this.notificationsService.success('Success', 'Comment edited successfully.');
          savedComment.Content = <any>this.domSanitizer.bypassSecurityTrustHtml(savedComment.Content);
          this.comments[index] = savedComment;
        }));
      }
    };

    this.modalRef = this.bsModalService.show(AlgoCommentEditPopupComponent, {
      initialState,
      class: 'modal-sm',
      keyboard: false,
      ignoreBackdropClick: true
    });
  }

  deleteComment(comment: AlgoComment, index: number): void {
    if (!this.permissions.canDeleteComment) {
      return;
    }

    const initialState = {
      popupConfig: {
        title: 'Delete comment',
        text: 'Are you sure you want to delete this comment?',
        btnCancelText: 'Cancel',
        btnConfirmText: 'Delete',
        successCallback: () => {
          this.subscriptions.push(this.algoCommentService.deleteComment(this.algoId, comment.CommentId).subscribe(() => {
            this.comments.splice(index, 1);
            this.notificationsService.success('Success', 'Comment deleted successfully');
          }));
        }
      }
    };

    this.modalRef = this.bsModalService.show(PopupComponent, {
      initialState,
      class: 'modal-sm',
      keyboard: false,
      ignoreBackdropClick: true
    });
  }

  onCommentSubmit(): void {
    if (this.commentForm.invalid || !this.permissions.canCreateComment) {
      return;
    }

    this.loader = true;

    this.subscriptions.push(this.algoCommentService.saveComment({ AlgoId: this.algoId, ...this.commentForm.value })
      .subscribe((savedComment) => {
        this.notificationsService.success('Success', 'Comment added successfully.');
        savedComment.Content = <any>this.domSanitizer.bypassSecurityTrustHtml(savedComment.Content);
        this.comments.unshift(savedComment);
        this.commentForm.reset();
        this.loader = false;
      }));
  }

  clearForm(): void {
    this.commentForm.reset();
  }

  toggleCollapse() {
    this.collapse = this.collapse === 'open' ? 'closed' : 'open';
  }

}
