import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AceEditorModule } from 'ng2-ace-editor';

// ROUTING
import { DesignRouting } from './design-routing.module';

// COMPONENTS
import { DesignComponent } from './design.component';
import {ExistingAlgoGuard} from '../services/existing-algo.guard';


@NgModule({
  imports: [
    DesignRouting,
    AceEditorModule,
    SharedModule
  ],
  declarations: [
    DesignComponent
  ],
  providers: [ExistingAlgoGuard]
})
export class DesignModule {}
