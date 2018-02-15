import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AceEditorModule } from 'ng2-ace-editor';

// ROUTING
import { DesignRouting } from './design-routing.module';

// COMPONENTS
import { DesignComponent } from './design.component';


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
