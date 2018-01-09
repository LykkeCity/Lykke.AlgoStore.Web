import { NgModule } from '@angular/core';

// ROUTING
import { DesignRouting } from './design-routing.module';

// COMPONENTS
import { DesignComponent } from './design.component';
import { SharedModule } from '../shared/shared.module';

// SERVICES


@NgModule({
  imports: [
    DesignRouting,
    SharedModule
  ],
  declarations: [
    DesignComponent
  ],
  providers: []
})
export class DesignModule {}
