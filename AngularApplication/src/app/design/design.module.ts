import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ROUTING
import { DesignRouting } from './design-routing.module';

// COMPONENTS
import { DesignComponent } from './design.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { PopupAlgoComponent } from './popup-algo/popup-algo.component';

// SERVICES


@NgModule({
  imports: [
    DesignRouting,
    AceEditorModule,
    CommonModule
  ],
  declarations: [
    DesignComponent,
    PopupAlgoComponent
  ],
  providers: []
})
export class DesignModule {}
