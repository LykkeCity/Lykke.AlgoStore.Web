import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { StoreService } from '../../../services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Wallet } from '../../../models/wallet.model';

@Component({
  selector: 'app-algo-run-popup',
  templateUrl: './algo-run-popup.component.html',
  styleUrls: ['./algo-run-popup.component.scss']
})
export class AlgoRunPopupComponent implements OnInit {

  runInstanceForm: FormGroup;
  isDemo: boolean;
  wallet: Wallet;


  constructor(private modalRef: BsModalRef, private storeService: StoreService, private fb: FormBuilder) {
    this.runInstanceForm = this.fb.group({
      Name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {
    if(this.runInstanceForm.invalid) {
      return;
    }

    if(this.isDemo) {
      this.storeService.createDemoAlgoIntance(this.runInstanceForm.value).subscribe(() => {
        this.modalRef.hide();
      });
    } else {
      this.storeService.createLiveAlgoIntance(this.runInstanceForm.value).subscribe(() => {
        this.modalRef.hide();
      });
    }
  }
}
