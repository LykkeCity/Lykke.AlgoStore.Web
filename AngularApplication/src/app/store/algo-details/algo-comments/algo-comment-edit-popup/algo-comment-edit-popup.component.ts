import { Component, OnInit } from '@angular/core';
import { AlgoComment } from '../../../../models/algo-comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-algo-comment-edit-popup',
  templateUrl: './algo-comment-edit-popup.component.html',
  styleUrls: ['./algo-comment-edit-popup.component.scss']
})
export class AlgoCommentEditPopupComponent implements OnInit {

  comment: AlgoComment;
  onEditSuccess: Function;
  commentEdit: FormGroup;

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) {
    this.commentEdit = this.fb.group({
      Content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.commentEdit.setValue({
      Content: this.comment.Content[Object.keys(this.comment.Content)[0]]
    });
  }

  onSubmit(): void {
    if (this.commentEdit.invalid) {
      return;
    }

    this.onEditSuccess({...this.comment, Content: this.commentEdit.value.Content});
    this.bsModalRef.hide();
  }

}
