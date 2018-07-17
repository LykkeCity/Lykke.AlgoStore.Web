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
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';
import { IdleService } from './core/services/idle.service';
import { AuthRequestService } from './core/services/auth-request.service';
import { AuthTokenService } from './core/services/auth-token.service';
import { LoginRedirectGuard } from './core/guards/login-redirect.guard';
import { AuthGuard } from './core/guards/auth-guard';
import { NonAuthenticatedGuard } from './core/guards/non-authenticated.guard';

// 3RD PARTY MODULES
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { BsModalRef } from 'ngx-bootstrap';

// APP MODULES
import { SharedModule } from './shared/shared.module';
import { PopupComponent } from './components/popup/popup.component';
import { IdlePopupComponent } from './components/popup/idle-popup/idle-popup.component';
import { AlgoService } from './core/services/algo.service';
import { AlgoCommentService } from './core/services/algo-comment.service';
import { AlgoRatingService } from './core/services/algo-rating.service';
import { InstanceService } from './core/services/instance.service';
import { FileService } from './core/services/file.service';
import { StompRService, StompService } from '@stomp/ng2-stompjs';


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
    BsModalRef,
    FileService,
    StompRService,
    StompService
  ],
  entryComponents: [PopupComponent, IdlePopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
