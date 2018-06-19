import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-collapse-content',
  templateUrl: './collapse-content.component.html',
  animations: [
    trigger('toggle', [
      state('collapsed', style({ height: 0, overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: 'visible' })),
      transition('collapsed => expanded', [
        style({ height: 0 }),
        animate('0.3s cubic-bezier(0.35, 0, 0.25, 1)', style({ height: '*' }))
      ]),
      transition('expanded => collapsed', [
        style({ height: '*', overflow: 'hidden' }),
        animate('0.30s cubic-bezier(0.35, 0, 0.25, 1)', style({ height: 0, overflow: 'hidden' }))
      ])
    ])
  ]
})
export class CollapseContentComponent {

  @Input() state: string;

  constructor() {
  }
}
