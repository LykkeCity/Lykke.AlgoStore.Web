import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { StoreService } from '../../../services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Wallet } from '../../../models/wallet.model';

@Component({
  selector: 'app-algo-run-popup',
  templateUrl: './algo-instance-popup.component.html',
  styleUrls: ['./algo-instance-popup.component.scss']
})
export class AlgoInstancePopupComponent implements OnInit {

  algoInstanceForm: FormGroup;
  instanceId: string;
  type: string;
  wallet: Wallet;
  onEditSuccess: Function;


  constructor(public modalRef: BsModalRef, private storeService: StoreService, private fb: FormBuilder) {
    this.algoInstanceForm = this.fb.group({
      Name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.algoInstanceForm.invalid) {
      return;
    }

    switch (this.type) {
      case "Demo":
        this.storeService.createDemoAlgoIntance(this.algoInstanceForm.value).subscribe(() => {
          this.modalRef.hide();
        });
        break;
      case "Live":
        this.storeService.createLiveAlgoIntance(this.algoInstanceForm.value).subscribe(() => {
          this.modalRef.hide();
        });
        break;
      case "Edit":
        // this.storeService.editInstance(this.instanceId, this.algoInstanceForm.value).subscribe(() => {
        //   this.modalRef.hide();
        //   this.onEditSuccess(this.algoInstanceForm.value.Name);
        // });
        break;
    }
  }
}
