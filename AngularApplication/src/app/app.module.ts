import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/header/user-profile/user-profile.component';

// Services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { EventService } from './services/event.service';
import { UserService } from './services/user.service';
import { IdleService } from './services/idle.service';
import { StoreService } from './services/store.service';
import { TokenInterceptor } from './services/token-interceptor.service';

// 3RD PARTY MODULES
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MomentModule } from 'angular2-moment'; // moment-style pipes for date formatting
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

// APP MODULES
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    AuthenticationComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    SharedModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    MomentModule,
    NgIdleKeepaliveModule.forRoot()
  ],
 providers: [
    AuthGuard,
    AuthService,
    EventService,
    IdleService,
    UserService,
    StoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
