import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { ɵa as ChartsDirective } from 'ngx-echarts';
import { PopupComponent } from '../components/popup/popup.component';
import { BsDropdownModule, ModalModule, PopoverModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { NgxEchartsDirective } from './chart/chart-package/ngx-echarts.directive';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CookieNoticeComponent } from './cookie-notice/cookie-notice.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AlertModule } from 'ngx-bootstrap';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { StarRatingConfigService } from './star-rating/star-rating-config';
import { ACLGuard } from '../core/guards/acl.guard';
import { UserDetailsGuard } from '../core/guards/user-details.guard';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoaderComponent } from './loader/loader.component';
import { CollapseContentComponent } from './collapse/collapse-content.component';
import { ChartComponent } from './chart/chart.component';
import { StompRService, StompService } from '@stomp/ng2-stompjs';
import { SearchFieldComponent } from './search-field/search-field.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UiSwitchModule,
    AceEditorModule,
    DpDatePickerModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    TabsModule.forRoot(),
    NgxDatatableModule
  ],
  providers: [StarRatingConfigService, ACLGuard, UserDetailsGuard, StompService, StompRService],
  declarations: [
    PopupComponent,
    CodeEditorComponent,
    DateTimePickerComponent,
    StarRatingComponent,
    LoaderComponent,
    CollapseContentComponent,
    ChartComponent,
    CookieNoticeComponent,
    SearchFieldComponent,
    NgxEchartsDirective
    // ChartsDirective
  ],
  exports: [
    CommonModule,
    PopupComponent,
    CodeEditorComponent,
    DateTimePickerComponent,
    AlertModule,
    ModalModule,
    TooltipModule,
    BsDropdownModule,
    TabsModule,
    StarRatingComponent,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    PopoverModule,
    LoaderComponent,
    CollapseContentComponent,
    ChartComponent,
    CookieNoticeComponent,
    SearchFieldComponent,
    NgxEchartsDirective
    // ChartsDirective
  ]
})
export class SharedModule {}
