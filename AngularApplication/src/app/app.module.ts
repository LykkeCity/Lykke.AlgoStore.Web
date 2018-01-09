import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { EventService } from './services/event.service';


// 3RD PARTY MODULES

import { SimpleNotificationsModule } from 'angular2-notifications';
import { MomentModule } from 'angular2-moment'; // moment-style pipes for date formatting
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

// APP MODULES
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { IdleService } from './services/idle.service';
import { StoreService } from './services/store.service';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { TokenInterceptor } from './services/token-interceptor.service';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    AuthenticationComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
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
    StoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
