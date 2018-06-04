import { Component } from '@angular/core';
import { Algo } from '../models/algo.interface';
import { AlgoService } from '../../services/algo.service';
import { Subscription } from 'rxjs/Subscription';
import { PopupConfig } from '../../models/popup.interface';
import { PopupComponent } from '../../components/popup/popup.component';
import { BsModalService } from 'ngx-bootstrap';
import { AlgoDuplicatePopupComponent } from './algo-duplicate-popup/algo-duplicate-popup.component';
import { UserService } from '../../services/user.service';
import Permissions from '../models/permissions';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-my-algos',
  templateUrl: './my-algos.component.html',
  styleUrls: ['./my-algos.component.scss']
})
export class MyAlgosComponent {

  algos: Algo[];
  loadingIndicator = true;
  subscriptions: Subscription[] = [];

  permissions: {
    canDeleteAlgo: boolean,
    canEditAlgo: boolean,
    canDuplicate: boolean
  };

  constructor(private algoService: AlgoService,
              private bsModalService: BsModalService,
              private usersService: UserService,
              private notificationsService: NotificationsService) {
      this.subscriptions.push(this.algoService.getMyAlgos().subscribe((algos) => {
        this.algos = algos;
        this.loadingIndicator = false;
      }));

      this.permissions = {
        canDeleteAlgo: this.usersService.hasPermission(Permissions.DELETE_ALGO),
        canDuplicate: this.usersService.hasPermission(Permissions.CREATE_ALGO),
        canEditAlgo: this.usersService.hasPermission(Permissions.EDIT_ALGO)
      };
  }

  duplicateAlgo(algo: Algo): void {
      if (!this.permissions.canDuplicate) {
        return;
      }

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
    if (!this.permissions.canDeleteAlgo) {
      return;
    }

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
    const deleteModel = {
      AlgoId: algo.Id,
      AlgoClientId: algo.ClientId,
      ForceDelete: false
    };

    this.subscriptions.push(this.algoService.delete(deleteModel).subscribe(() => {
      this.notificationsService.success('Success', 'Algo has been deleted successfully.');

      const index = this.algos.findIndex(a => a.Id === algo.Id);
      this.algos.splice(index, 1);

      this.algos = [...this.algos];
    }, (error) => {
      this.notificationsService.error('Error', error.DisplayMessage);
    }));
  }

  isBigger({ row, column, value }): any {
    return {
      'block-cell': value.length > 30
    };
  }
}
