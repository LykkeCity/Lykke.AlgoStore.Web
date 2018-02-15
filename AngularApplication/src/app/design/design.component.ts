import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../services/event.service';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from '../services/store.service';
import { PopupComponent } from '../components/popup/popup.component';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit, AfterViewInit {

  store: StoreService;

  subscribeToSave: Subscription;
  subscribeToGet: Subscription;

  @ViewChild('editor') editor;

  text = `
  public class Dog {
    String breed;
    int age;
    String color;

    void barking() {
    }

    void hungry() {
    }

    void sleeping() {
    }
 }
  `;
  log: string;

  constructor(private eventService: EventService, private storeService: StoreService, private ref: ChangeDetectorRef, private modalService: BsModalService) {
    this.store = storeService;
  }

  ngOnInit() {
    this.subscribeToGet = this.storeService.algoGet(this.storeService.activeAlgo.ClientId, this.storeService.activeAlgo.Id).subscribe(this.onAlgoGetDone);
  }

  ngAfterViewInit() {
    this.editor.setTheme('eclipse');

    this.editor.getEditor().setOptions({
      enableSnippets: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true
    });

    this.editor.getEditor().commands.addCommand({
      name: 'showOtherCompletions',
      bindKey: 'Ctrl-.',
      exec: function () {
      }
    });
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

  onAlgoGetDone = (response) => {
    this.text = response.Data;
    this.subscribeToGet.unsubscribe();
    this.ref.detectChanges();
  };

  onAlgoSaveDone = (status) => {
    console.log(status);
    this.subscribeToSave.unsubscribe();
  };

  save(): void {
    this.subscribeToSave = this.storeService.algoSave(this.storeService.activeAlgo.Id, this.text).subscribe(this.onAlgoSaveDone);
  }

}
