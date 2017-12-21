import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PopupConfig } from '../models/popup.interface';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit, AfterViewInit {

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

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.subscribeToEvent('popup:confirm', this.onPopupConfirm.bind(this));
    this.eventService.subscribeToEvent('popup:cancel', this.onPopupCancel.bind(this));
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

    // this.showPopup();
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
    this.eventService.emitEvent('popup:open', popupConfig);
  }

  onPopupConfirm(popupData) {
    switch(popupData.name) {
      case  "deleteAlgoWarning":
        this.eventService.emitEvent('popup:close');
        break;
    }
  }
  onPopupCancel(popupData) {
    switch(popupData.name) {
      case  "deleteAlgoWarning":
        this.eventService.emitEvent('popup:close');
        break;
    }
  }

}
