import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NotificationsComponent } from './components/header/notifications/notifications.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/header/user-profile/user-profile.component';

// Services
import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { UserService } from './services/user.service';
import { IdleService } from './services/idle.service';
import { StoreService } from './services/store.service';
import { AuthRequestService } from './services/auth-request.service';
import { AuthTokenService } from './services/auth-token.service';
import { LoginRedirectGuard } from './services/login-redirect.guard';
import { AuthGuard } from './services/auth-guard';
import { NonAuthenticatedGuard } from './services/non-authenticated.guard';

// 3RD PARTY MODULES
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { BsModalRef, PopoverModule } from 'ngx-bootstrap';

// APP MODULES
import { SharedModule } from './shared/shared.module';
import { PopupComponent } from './components/popup/popup.component';
import { IdlePopupComponent } from './components/popup/idle-popup/idle-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    NotificationsComponent,
    FooterComponent,
    UserProfileComponent,
    IdlePopupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    PopoverModule.forRoot()
  ],
 providers: [
    AuthGuard,
    AuthService,
    EventService,
    IdleService,
    UserService,
    StoreService,
    AuthRequestService,
    AuthTokenService,
    LoginRedirectGuard,
    NonAuthenticatedGuard,
   BsModalRef
  ],
  entryComponents: [PopupComponent, IdlePopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
