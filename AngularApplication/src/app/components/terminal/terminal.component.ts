import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  

  @Input("title") title: string;
  @Input() model: string;

  constructor() { 
    
  }

  ngOnInit(): void {
    console.log(this.title);
  }

}
