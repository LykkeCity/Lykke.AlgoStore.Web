import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ROUTING
import { DesignRouting } from './design-routing.module';

// COMPONENTS
import { DesignComponent } from './design.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { SharedModule } from '../shared/shared.module';

// SERVICES


@NgModule({
  imports: [
    DesignRouting,
    AceEditorModule,
    SharedModule
  ],
  declarations: [
    DesignComponent
  ],
  providers: []
})
export class DesignModule {}