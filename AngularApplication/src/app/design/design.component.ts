import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from '../services/store.service';
import { PopupComponent } from '../components/popup/popup.component';
import { BsModalService } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Algo } from '../store/models/algo.interface';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnDestroy {

  algo: Algo = {};
  subscribeToSave: Subscription;
  subscribeToGet: Subscription;
  routerSubscription: Subscription;

  constructor(private storeService: StoreService, private modalService: BsModalService, private route: ActivatedRoute) {
    this.routerSubscription = this.route.params.subscribe(params => {
      const id = params['id'];

      this.subscribeToGet = this.storeService.algoGetMetadata(id).subscribe((algo) => {
        this.algo = algo;
      });
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    this.subscribeToGet.unsubscribe();
    this.subscribeToSave.unsubscribe();
  }

  downloadProjectTemplate(): void {
    const initialState = {
      popupConfig: {
        hideIcon: true,
        name: 'downloadProjectTemplateInfo',
        width: 370,
        title: 'Download algo',
        textClass: 'text-center',
        text: 'Download project for local development. You will get a basic architecture ' +
        'of the trading algo together with REST API consumer for the HFT API.',
        btnCancelText: 'Cancel',
        btnConfirmText: 'Yes, download the template',
        successCallback: this.onPopupConfirm,
      }
    };

    this.modalService.show(PopupComponent, { initialState, class: 'modal-sm custom-popup' });
  }

  onPopupConfirm = (popupData) => {
    switch (popupData.name) {
      case  'downloadProjectTemplateInfo':
        console.log('download');
        break;
    }
  };

  save(): void {
    this.subscribeToSave = this.storeService.algoSave(this.algo['AlgoId'], this.algo.Data).subscribe();
  }
}
