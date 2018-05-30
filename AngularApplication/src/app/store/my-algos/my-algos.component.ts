import { Component } from '@angular/core';
import { Algo } from '../models/algo.interface';
import { AlgoService } from '../../services/algo.service';
import { Subscription } from 'rxjs/Subscription';
import { PopupConfig } from '../../models/popup.interface';
import { PopupComponent } from '../../components/popup/popup.component';
import { BsModalService } from 'ngx-bootstrap';
import { AlgoDuplicatePopupComponent } from './algo-duplicate-popup/algo-duplicate-popup.component';

@Component({
  selector: 'app-my-algos',
  templateUrl: './my-algos.component.html',
  styleUrls: ['./my-algos.component.scss']
})
export class MyAlgosComponent {

  algos: Algo[];
  loadingIndicator = true;
  subscriptions: Subscription[] = [];

  constructor(private algoService: AlgoService, private bsModalService: BsModalService) {
      this.subscriptions.push(this.algoService.getMyAlgos().subscribe((algos) => {
        this.algos = algos;
        this.loadingIndicator = false;
      }));
  }

  duplicateAlgo(algo: Algo): void {
      const initialState = {
        algo,
        onCreateSuccess: (newAlgo) => {
          this.algos.push(newAlgo);
          this.algos = [...this.algos];
        }
      };

      this.bsModalService.show(AlgoDuplicatePopupComponent, {initialState, class: 'modal-sm', keyboard: false, ignoreBackdropClick: true});
  }

  delete(algo: Algo): void {
    const initialState = {
      popupConfig: {
        title: 'Delete algo',
        text: `Are you sure you want to delete ${algo.Name}?`,
        btnCancelText: 'Cancel',
        btnConfirmText: 'Delete',
        successCallback: () => {
          this.deleteAlgo(algo);
        }
      } as PopupConfig
    };
    this.bsModalService.show(PopupComponent, {initialState, class: 'modal-sm', keyboard: false, ignoreBackdropClick: true});
  }

  deleteAlgo(algo: Algo): void {
    // this.subscriptions.push(this.algoService.deleteAlgo(algo).subscribe(() => {
    //   this.notificationsService.success('Success', 'Algo has been deleted successfully.');
    //   this.router.navigate(['/store/my-algos']);
    // }));
  }
}
