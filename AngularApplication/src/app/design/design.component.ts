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

  showPopup() {
    const popupConfig: PopupConfig = {
      name: 'sessionWarning',
      width: 370,
      title: 'Your session is about expire',
      text: 'You will be logged off in ' + 12 + ' second due to inactivity.',
      btnCancelText: 'Keep me logged in',
      btnConfirmText: 'Logout'
    };
    this.eventService.emitEvent('popup:algo:open', popupConfig);
  }

}
