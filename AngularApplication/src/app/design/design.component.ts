import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PopupConfig} from '../models/popup.interface';
import {EventService} from '../services/event.service';
import {Subscription} from 'rxjs/Subscription';
import {StoreService} from '../services/store.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit, AfterViewInit, OnDestroy {

  store: any;

  subscribeToSave: any;
  subscribeToGet: any;

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

  private subscriptions: Subscription[] = [];
  log: string;

  constructor(private eventService: EventService, private storeService: StoreService, private ref: ChangeDetectorRef) {
    this.store = storeService;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.eventService.popupConfirm.subscribe(this.onPopupConfirm),
      this.eventService.popupCancel.subscribe(this.onPopupCancel)
    );

    this.subscribeToGet = this.storeService.algoGet(this.storeService.activeAlgo.Id).subscribe(this.onAlgoGetDone);
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
      exec: function (editor) {
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  downloadProjectTemplate() {
    const popupConfig: PopupConfig = {
      hideIcon: true,
      name: 'downloadProjectTemplateInfo',
      width: 370,
      title: 'Download algo',
      textClass: 'text-center',
      text: 'Download project for local development. You will get a basic architecture of the trading algo together with REST API consumer for the HFT API.',
      btnCancelText: 'Cancel',
      btnConfirmText: 'Yes, download the template'
    };

    this.eventService.popupOpen.next(popupConfig);
  }

  onPopupConfirm = (popupData) => {
    switch (popupData.name) {
      case  'downloadProjectTemplateInfo':
        this.eventService.popupClose.next();
        break;
    }
  };
  onPopupCancel = (popupData) => {
    switch (popupData.name) {
      case  'downloadProjectTemplateInfo':
        this.eventService.popupClose.next();
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

  save() {
    this.subscribeToSave = this.storeService.algoSave(this.storeService.activeAlgo.Id, this.text).subscribe(this.onAlgoSaveDone);
  }

}
