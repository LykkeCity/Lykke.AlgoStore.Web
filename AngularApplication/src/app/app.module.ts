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
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/header/user-profile/user-profile.component';

// Services
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { IdleService } from './services/idle.service';
import { AuthRequestService } from './services/auth-request.service';
import { AuthTokenService } from './services/auth-token.service';
import { LoginRedirectGuard } from './services/login-redirect.guard';
import { AuthGuard } from './services/auth-guard';
import { NonAuthenticatedGuard } from './services/non-authenticated.guard';

// 3RD PARTY MODULES
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { BsModalRef } from 'ngx-bootstrap';

// APP MODULES
import { SharedModule } from './shared/shared.module';
import { PopupComponent } from './components/popup/popup.component';
import { IdlePopupComponent } from './components/popup/idle-popup/idle-popup.component';
import { AlgoService } from './services/algo.service';
import { AlgoCommentService } from './services/algo-comment.service';
import { AlgoRatingService } from './services/algo-rating.service';
import { InstanceService } from './services/instance.service';


@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
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
  ],
  providers: [
    AuthGuard,
    AuthService,
    IdleService,
    UserService,
    AuthRequestService,
    AuthTokenService,
    LoginRedirectGuard,
    NonAuthenticatedGuard,
    AlgoService,
    AlgoCommentService,
    AlgoRatingService,
    InstanceService,
    BsModalRef
  ],
  entryComponents: [PopupComponent, IdlePopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
