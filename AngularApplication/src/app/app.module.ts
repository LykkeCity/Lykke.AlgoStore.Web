import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/header/search/search.component';
import { NotificationsComponent } from './components/header/notifications/notifications.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AlgoDetailsComponent } from './store/algo-details/algo-details.component';
import { AlgoListComponent } from './store/algo-list/algo-list.component';

// Services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { EventService } from './services/event.service';


// 3RD PARTY MODULES

import { SimpleNotificationsModule } from 'angular2-notifications';
import { MomentModule } from 'angular2-moment'; // moment-style pipes for date formatting
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

// APP MODULES
import { SharedModule } from './shared/shared.module';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { IdleService } from './services/idle.service';
import { SettingsModule } from './settings/settings.module';
import { UserService } from './services/user.service';
import { UserProfileComponent } from './components/header/user-profile/user-profile.component';
import { IssuersService } from './services/issuers.service';
import { StoreService } from './services/store.service';
import { HomeComponent } from './components/home/home.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { TokenInterceptor } from './services/token-interceptor.service';
import { CommandsComponent } from './components/commands/commands.component';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AlgoEditComponent } from './store/algo-edit/algo-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    HeaderComponent,
    SearchComponent,
    NotificationsComponent,
    FooterComponent,
    NotFoundComponent,
    AuthenticationComponent,
    UserProfileComponent,
    HomeComponent,
    AlgoDetailsComponent,
    CommandsComponent,
    AlgoListComponent,
    AlgoEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    SharedModule,
    SimpleNotificationsModule.forRoot(),
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    SettingsModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    EventService,
    IdleService,
    UserService,
    IssuersService,
    StoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
