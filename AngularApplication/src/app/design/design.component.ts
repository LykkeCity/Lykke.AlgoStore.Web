import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PopupConfig } from '../models/popup.interface';
import { EventService } from '../services/event.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit, AfterViewInit, OnDestroy {

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

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.eventService.popupConfirm.subscribe(this.onPopupConfirm),
      this.eventService.popupCancel.subscribe(this.onPopupCancel),
    );
  }

  ngAfterViewInit() {
    this.editor.setTheme('eclipse');

    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true
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

  clickMe(){
    this.showPopup();
  }

  showPopup() {
    const popupConfig: PopupConfig = {
      hideIcon: true,
      name: 'deleteAlgoWarning',
      width: 370,
      title: 'Delete Algo?',
      text: 'Are you sure you want to delete this Algo from your list?',
      btnCancelText: 'No, I don’t want',
      btnConfirmText: 'Yes, Delete Algo'
    };
    
    this.eventService.popupOpen.next(popupConfig);
  }

  onPopupConfirm = (popupData) => {
    switch(popupData.name) {
      case  "deleteAlgoWarning":
        this.eventService.popupClose.next();
        break;
    }
  }
  onPopupCancel = (popupData) => {
    switch(popupData.name) {
      case  "deleteAlgoWarning":
        this.eventService.popupClose.next();
        break;
    }
  }

}
