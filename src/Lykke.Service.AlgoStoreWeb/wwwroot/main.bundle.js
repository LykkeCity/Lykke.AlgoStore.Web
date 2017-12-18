webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/design/design.module": [
		"../../../../../src/app/design/design.module.ts",
		"design.module"
	],
	"app/settings/settings.module": [
		"../../../../../src/app/settings/settings.module.ts"
	],
	"app/store/store.module": [
		"../../../../../src/app/store/store.module.ts",
		"store.module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_not_found_not_found_component__ = __webpack_require__("../../../../../src/app/components/not-found/not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_authentication_authentication_component__ = __webpack_require__("../../../../../src/app/components/authentication/authentication.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_guard_service__ = __webpack_require__("../../../../../src/app/services/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_home_home_component__ = __webpack_require__("../../../../../src/app/components/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__layout_site_layout_site_layout_component__ = __webpack_require__("../../../../../src/app/layout/site-layout/site-layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__store_algo_details_algo_details_component__ = __webpack_require__("../../../../../src/app/store/algo-details/algo-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__store_algo_list_algo_list_component__ = __webpack_require__("../../../../../src/app/store/algo-list/algo-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__store_algo_edit_algo_edit_component__ = __webpack_require__("../../../../../src/app/store/algo-edit/algo-edit.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_3__components_authentication_authentication_component__["a" /* AuthenticationComponent */] },
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_6__layout_site_layout_site_layout_component__["a" /* SiteLayoutComponent */],
        children: [
            //{ path: 'auth', component: AuthenticationComponent },
            { path: 'design', loadChildren: 'app/design/design.module#DesignModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__services_auth_guard_service__["a" /* AuthGuard */]] },
            { path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__services_auth_guard_service__["a" /* AuthGuard */]] },
            { path: 'store', loadChildren: 'app/store/store.module#StoreModule', canActivate: [__WEBPACK_IMPORTED_MODULE_4__services_auth_guard_service__["a" /* AuthGuard */]] },
            { path: 'store/algo-details', component: __WEBPACK_IMPORTED_MODULE_7__store_algo_details_algo_details_component__["a" /* AlgoDetailsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4__services_auth_guard_service__["a" /* AuthGuard */]] },
            { path: 'store/algo-list', component: __WEBPACK_IMPORTED_MODULE_8__store_algo_list_algo_list_component__["a" /* AlgoListComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4__services_auth_guard_service__["a" /* AuthGuard */]] },
            //{ path: 'store/algo/:id/edit', component: AlgoEditComponent, canActivate: [AuthGuard] },
            { path: 'store/algo-edit', component: __WEBPACK_IMPORTED_MODULE_9__store_algo_edit_algo_edit_component__["a" /* AlgoEditComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4__services_auth_guard_service__["a" /* AuthGuard */]] },
            { path: '404', component: __WEBPACK_IMPORTED_MODULE_2__components_not_found_not_found_component__["a" /* NotFoundComponent */] },
        ]
    },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_5__components_home_home_component__["a" /* HomeComponent */] },
    { path: '**', redirectTo: '404' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    //options: object;
    function AppComponent() {
        // this.options = {
        //   timeOut: 2800,
        //   clickToClose: true,
        //   maxLength: 0,
        //   maxStack: 1,
        //   showProgressBar: true,
        //   pauseOnHover: true,
        //   animate: 'fromRight',
        //   position: ['top', 'right']
        // };
    }
    AppComponent.prototype.ngOnInit = function () {
        //this.idleService.init();
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_header_header_component__ = __webpack_require__("../../../../../src/app/components/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_header_search_search_component__ = __webpack_require__("../../../../../src/app/components/header/search/search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_header_notifications_notifications_component__ = __webpack_require__("../../../../../src/app/components/header/notifications/notifications.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_footer_footer_component__ = __webpack_require__("../../../../../src/app/components/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_not_found_not_found_component__ = __webpack_require__("../../../../../src/app/components/not-found/not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__store_algo_details_algo_details_component__ = __webpack_require__("../../../../../src/app/store/algo-details/algo-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__store_algo_list_algo_list_component__ = __webpack_require__("../../../../../src/app/store/algo-list/algo-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_auth_guard_service__ = __webpack_require__("../../../../../src/app/services/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angular2_notifications__ = __webpack_require__("../../../../angular2-notifications/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angular2_notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_angular2_notifications__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_moment__ = __webpack_require__("../../../../angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ng_idle_keepalive__ = __webpack_require__("../../../../@ng-idle/keepalive/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_authentication_authentication_component__ = __webpack_require__("../../../../../src/app/components/authentication/authentication.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_idle_service__ = __webpack_require__("../../../../../src/app/services/idle.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__settings_settings_module__ = __webpack_require__("../../../../../src/app/settings/settings.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_header_user_profile_user_profile_component__ = __webpack_require__("../../../../../src/app/components/header/user-profile/user-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__services_issuers_service__ = __webpack_require__("../../../../../src/app/services/issuers.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__services_store_service__ = __webpack_require__("../../../../../src/app/services/store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_home_home_component__ = __webpack_require__("../../../../../src/app/components/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__layout_site_layout_site_layout_component__ = __webpack_require__("../../../../../src/app/layout/site-layout/site-layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__services_token_interceptor_service__ = __webpack_require__("../../../../../src/app/services/token-interceptor.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_commands_commands_component__ = __webpack_require__("../../../../../src/app/components/commands/commands.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__store_algo_edit_algo_edit_component__ = __webpack_require__("../../../../../src/app/store/algo-edit/algo-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






// Components








// Services



// 3RD PARTY MODULES

 // moment-style pipes for date formatting

// APP MODULES















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_29__layout_site_layout_site_layout_component__["a" /* SiteLayoutComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_header_search_search_component__["a" /* SearchComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_header_notifications_notifications_component__["a" /* NotificationsComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_footer_footer_component__["a" /* FooterComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_not_found_not_found_component__["a" /* NotFoundComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_authentication_authentication_component__["a" /* AuthenticationComponent */],
                __WEBPACK_IMPORTED_MODULE_25__components_header_user_profile_user_profile_component__["a" /* UserProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_28__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_12__store_algo_details_algo_details_component__["a" /* AlgoDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_31__components_commands_commands_component__["a" /* CommandsComponent */],
                __WEBPACK_IMPORTED_MODULE_13__store_algo_list_algo_list_component__["a" /* AlgoListComponent */],
                __WEBPACK_IMPORTED_MODULE_33__store_algo_edit_algo_edit_component__["a" /* AlgoEditComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_20__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_17_angular2_notifications__["SimpleNotificationsModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_18_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_19__ng_idle_keepalive__["a" /* NgIdleKeepaliveModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_23__settings_settings_module__["SettingsModule"],
                __WEBPACK_IMPORTED_MODULE_32__angular_material__["g" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_32__angular_material__["d" /* MatPaginatorModule */],
                __WEBPACK_IMPORTED_MODULE_34__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_34__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_32__angular_material__["a" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_32__angular_material__["b" /* MatInputModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_15__services_auth_guard_service__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_14__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_16__services_event_service__["a" /* EventService */],
                __WEBPACK_IMPORTED_MODULE_22__services_idle_service__["a" /* IdleService */],
                __WEBPACK_IMPORTED_MODULE_24__services_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_26__services_issuers_service__["a" /* IssuersService */],
                __WEBPACK_IMPORTED_MODULE_27__services_store_service__["a" /* StoreService */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_30__services_token_interceptor_service__["a" /* TokenInterceptor */],
                    multi: true
                }
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/components/authentication/authentication.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"mt-50 spinner\">\r\n  <div class=\"spinner__inside\"></div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/authentication/authentication.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/authentication/authentication.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthenticationComponent = (function () {
    function AuthenticationComponent(route, router, authService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.route.queryParams.subscribe(function (params) {
            var redirectUrl = localStorage.getItem('returnUrl');
            if (params && params.code && redirectUrl) {
                _this.authService.getAccessToken(params.code);
            }
            else if (!_this.authService._isAuthenticated) {
                // TODO return to SSO
                if (["/", "/home"].includes(_this.router.url)) {
                    _this.router.navigate(['home']);
                }
                else {
                    _this.router.navigate(["store"]);
                }
            }
        });
    }
    AuthenticationComponent.prototype.ngOnInit = function () {
    };
    AuthenticationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-authentication',
            template: __webpack_require__("../../../../../src/app/components/authentication/authentication.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/authentication/authentication.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]])
    ], AuthenticationComponent);
    return AuthenticationComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/commands/commands.component.html":
/***/ (function(module, exports) {

module.exports = "<ul class=\"commands\">\n  <li>\n    <a [ngClass]=\"algo.Status\" href=\"#\" (click)=\"doCommand()\"></a>\n  </li>\n  <!-- <li>\n    <a class=\"test\" href=\"#\"></a>\n  </li> -->\n  <li>\n    <a class=\"edit\" href=\"#\" (click)=\"doCommand(Command.Edit)\"></a>\n  </li>\n  <li>\n    <a class=\"delete\" href=\"#\" (click)=\"doCommand(Command.Delete)\"></a>\n  </li>\n</ul>\n"

/***/ }),

/***/ "../../../../../src/app/components/commands/commands.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/commands/commands.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommandsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_service__ = __webpack_require__("../../../../../src/app/services/store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_command_enum__ = __webpack_require__("../../../../../src/app/models/command.enum.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_status_enum__ = __webpack_require__("../../../../../src/app/models/status.enum.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_notifications__ = __webpack_require__("../../../../angular2-notifications/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_notifications__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CommandsComponent = (function () {
    function CommandsComponent(storeService, eventService, notificationService, router) {
        this.storeService = storeService;
        this.eventService = eventService;
        this.notificationService = notificationService;
        this.router = router;
        this.Command = __WEBPACK_IMPORTED_MODULE_2__models_command_enum__["a" /* Command */];
        this.Status = __WEBPACK_IMPORTED_MODULE_3__models_status_enum__["a" /* Status */];
        this.eventService.subscribeToEvent('algo:test:started', this.onAlgoTestStarted.bind(this));
        this.eventService.subscribeToEvent('algo:test:error', this.onAlgoTestError.bind(this));
    }
    CommandsComponent.prototype.ngOnInit = function () {
    };
    CommandsComponent.prototype.doCommand = function (command) {
        if (!command) {
            if (this.algo.Status == __WEBPACK_IMPORTED_MODULE_3__models_status_enum__["a" /* Status */].DEPLOYED || this.algo.Status == __WEBPACK_IMPORTED_MODULE_3__models_status_enum__["a" /* Status */].UNKNOWN || this.algo.Status == __WEBPACK_IMPORTED_MODULE_3__models_status_enum__["a" /* Status */].STOPPED) {
                this.storeService.algoStart(this.algo.Id);
            }
            else {
                this.storeService.algoStop(this.algo.Id);
            }
        }
        else {
            switch (command) {
                case __WEBPACK_IMPORTED_MODULE_2__models_command_enum__["a" /* Command */].Edit:
                    this.storeService.activeAlgo = this.algo;
                    this.router.navigate(["store/algo-edit"]);
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__models_command_enum__["a" /* Command */].Delete:
                    this.storeService.algoDelete(this.algo);
                    break;
                default:
                    break;
            }
        }
        return false;
    };
    CommandsComponent.prototype.onAlgoTestStarted = function (status) {
        this.algo.Status = status;
        console.log(status);
    };
    CommandsComponent.prototype.onAlgoTestError = function () {
        this.notificationService.error('Error', 'Some error occured!');
        console.log('AlgoTestError');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], CommandsComponent.prototype, "algo", void 0);
    CommandsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-commands',
            template: __webpack_require__("../../../../../src/app/components/commands/commands.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/commands/commands.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_4__services_event_service__["a" /* EventService */],
            __WEBPACK_IMPORTED_MODULE_6_angular2_notifications__["NotificationsService"],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]])
    ], CommandsComponent);
    return CommandsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<footer class=\"main-footer\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-5\">\r\n        <div class=\"copy-wrapper pull-left\">\r\n          <p class=\"\">&copy; Lykke 2017. All rights reserved</p>\r\n        </div>\r\n        <nav class=\"main-footer-nav pull-left\">\r\n          <a href=\"javascript:;\">Terms of Use</a>\r\n        </nav>\r\n      </div>\r\n      <div class=\"col-xs-7\">\r\n          <nav class=\"social-nav\">\r\n            <a href=\"javascript:;\"><i class=\"icon icon--fb\"></i></a>\r\n            <a href=\"javascript:;\"><i class=\"icon icon--tw\"></i></a>\r\n            <a href=\"javascript:;\"><i class=\"icon icon--instagram\"></i></a>\r\n            <a href=\"javascript:;\"><i class=\"icon icon--youtube\"></i></a>\r\n            <a href=\"javascript:;\"><i class=\"icon icon--linkedin\"></i></a>\r\n            <a href=\"javascript:;\"><i class=\"icon icon--reddit\"></i></a>\r\n            <a href=\"javascript:;\"><i class=\"icon icon--telegram\"></i></a>\r\n            <a href=\"javascript:;\"><i class=\"icon icon--slack\"></i></a>\r\n          </nav>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</footer>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/components/footer/footer.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__("../../../../../src/app/components/footer/footer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/footer/footer.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<header class=\"header-placeholder\">\r\n\r\n  <nav class=\"navbar navbar-default\">\r\n    <div class=\"container\">\r\n      <!-- Brand and toggle get grouped for better mobile display -->\r\n      <div class=\"row\">\r\n\r\n        <div class=\"col-md-6\">\r\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar-collapse\"\r\n          aria-expanded=\"false\">\r\n          <span class=\"sr-only\">Toggle navigation</span>\r\n          <span class=\"icon-bar\"></span>\r\n          <span class=\"icon-bar\"></span>\r\n          <span class=\"icon-bar\"></span>\r\n        </button>\r\n        <!--<a class=\"navbar-brand\" href=\"#\">Brand</a>-->\r\n        <a routerLinkActive=\"active\" routerLink=\"/store\">\r\n          <img src=\"assets/img/lykke-small.png\" alt=\"Lykke Wellet\" class=\"header-logo\">\r\n          <h2 class=\"header-page-title\">\r\n            Algo Store</h2>\r\n        </a>\r\n        </div>\r\n        <div class=\"col-md-6 clearfix\">\r\n            <app-user-profile></app-user-profile>\r\n        </div>\r\n      </div>\r\n      \r\n\r\n      <div class=\"collapse navbar-collapse\" id=\"navbar-collapse\">\r\n          \r\n        <!-- <ul class=\"nav navbar-nav navbar-right\">\r\n          <li>\r\n            <a href=\"#\">Design</a>\r\n          </li>\r\n          <li>\r\n            <a href=\"#\">Deploy</a>\r\n          </li>\r\n          <li>\r\n            <a href=\"#\">Analyse</a>\r\n          </li>\r\n          <li>\r\n            <a href=\"#\">Docs</a>\r\n          </li>\r\n        </ul> -->\r\n      </div>\r\n      <!-- /.navbar-collapse -->\r\n    </div>\r\n    <!-- /.container -->\r\n  </nav>\r\n</header>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/header/header.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeaderComponent = (function () {
    function HeaderComponent(authService, eventService) {
        this.authService = authService;
        this.eventService = eventService;
    }
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/components/header/header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/header/header.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__services_event_service__["a" /* EventService */]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/header/notifications/notifications.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  notifications works!\r\n</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/header/notifications/notifications.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/header/notifications/notifications.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotificationsComponent = (function () {
    function NotificationsComponent() {
    }
    NotificationsComponent.prototype.ngOnInit = function () {
    };
    NotificationsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-notifications',
            template: __webpack_require__("../../../../../src/app/components/header/notifications/notifications.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/header/notifications/notifications.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], NotificationsComponent);
    return NotificationsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/header/search/search.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  search works!\r\n</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/header/search/search.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/header/search/search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SearchComponent = (function () {
    function SearchComponent() {
    }
    SearchComponent.prototype.ngOnInit = function () {
    };
    SearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-search',
            template: __webpack_require__("../../../../../src/app/components/header/search/search.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/header/search/search.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SearchComponent);
    return SearchComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/header/user-profile/user-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"user-profile-wrapper pull-right\" *ngIf=\"userData\">\r\n  <div class=\"dropdown-hover\">\r\n    <span class=\"header-img-profile-wrapper\">\r\n      <img src=\"assets/img/user_default.svg\" alt=\"\">\r\n    </span>\r\n    <!-- <span class=\"text-lg gray-dark\">{{userData.FullName}}</span> -->\r\n    <span class=\"text-lg gray-dark\">User</span>\r\n  </div>\r\n  <div class=\"dropdown-container\">\r\n    <div class=\"wallet-dropdown-items-container\">\r\n      <ul class=\"actions-list\">\r\n        <li class=\"list-item\">\r\n          <a class=\"wallet-dropdown-link\" href=\"javascript:;\" (click)=\"logout(true)\">\r\n            Logout\r\n          </a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/components/header/user-profile/user-profile.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/header/user-profile/user-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserProfileComponent = (function () {
    function UserProfileComponent(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.userData.subscribe(function (data) {
            _this.userData = data;
        });
    };
    UserProfileComponent.prototype.logout = function (redirect) {
        this.authService.logout(redirect);
    };
    UserProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-profile',
            template: __webpack_require__("../../../../../src/app/components/header/user-profile/user-profile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/header/user-profile/user-profile.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]])
    ], UserProfileComponent);
    return UserProfileComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"home-placeholder text-center table\">\n  <div class=\"row table-cell\">\n    <div class=\"col-md-12\">\n      <img src=\"assets/img/lykke.png\" alt=\"Lykke AlgoStore\">\n      <h1>Algo Store</h1>\n      <p class=\"mt-50 mb-75\">\n        Lykke's Algo Store allows you to design, deploy, and analyse your own automated <br>trading strategies right from your web browser\n      </p>\n      <button (click)=\"openAnAccount()\" class=\"button button-blue text-uppercase\">Open an account</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/home/home.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(router) {
        this.router = router;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.openAnAccount = function () {
        this.router.navigate(["store"]);
    };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__("../../../../../src/app/components/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/not-found/not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  not-found works!\r\n</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/not-found/not-found.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/not-found/not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotFoundComponent = (function () {
    function NotFoundComponent() {
    }
    NotFoundComponent.prototype.ngOnInit = function () {
    };
    NotFoundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-not-found',
            template: __webpack_require__("../../../../../src/app/components/not-found/not-found.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/not-found/not-found.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], NotFoundComponent);
    return NotFoundComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/popup/popup.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"popup-wrapper\" *ngIf=\"showPopup && popupConfig\" [ngStyle]=\"{'width.px': popupConfig.width}\">\r\n  <div class=\"popup-container text-center\">\r\n    <img src=\"/assets/img/attention.svg\" alt=\"attention image\" />\r\n    <h1 class=\"mt-30 mb-30 heading-md gray-dark bold\">{{popupConfig.title}}</h1>\r\n    <p class=\"mb-40 text-lg text-left\">{{popupConfig.text}}</p>\r\n    <div class=\"row\">\r\n      <button class=\"button button-blue display-block  mb-10 col-xs-12\" (click)=\"onPopupCancel()\">{{popupConfig.btnCancelText}}</button>\r\n      <button class=\"button display-block text-center col-xs-12\" (click)=\"onPopupConfirm()\">{{popupConfig.btnConfirmText}}</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"curtain\" *ngIf=\"showPopup && popupConfig\" [ngClass]=\"{show: showPopup}\" (click)=\"onPopupConfirm()\">\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/popup/popup.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/popup/popup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PopupComponent = (function () {
    function PopupComponent(eventService) {
        this.eventService = eventService;
        this.elementBody = document.querySelector('body');
        this.showPopup = false;
        this.bindEvents();
    }
    PopupComponent.prototype.ngOnInit = function () {
        this.eventService.subscribeToEvent('popup:open', this.onPopupOpen.bind(this));
        this.eventService.subscribeToEvent('popup:close', this.onPopupClose.bind(this));
    };
    PopupComponent.prototype.bindEvents = function () {
        this.eventService.addEvent('popup:open');
        this.eventService.addEvent('popup:close');
        this.eventService.addEvent('popup:confirm');
        this.eventService.addEvent('popup:cancel');
    };
    PopupComponent.prototype.onPopupOpen = function (data) {
        this.showPopup = true;
        this.popupConfig = data;
        this.elementBody.classList.add('blur-popup');
    };
    PopupComponent.prototype.onPopupClose = function (data) {
        this.showPopup = false;
        this.popupConfig = null;
        this.elementBody.classList.remove('blur-popup');
    };
    PopupComponent.prototype.onPopupCancel = function () {
        this.eventService.emitEvent('popup:cancel', { name: this.popupConfig.name });
    };
    PopupComponent.prototype.onPopupConfirm = function () {
        this.eventService.emitEvent('popup:confirm', { name: this.popupConfig.name });
    };
    PopupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-popup',
            template: __webpack_require__("../../../../../src/app/components/popup/popup.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/popup/popup.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_event_service__["a" /* EventService */]])
    ], PopupComponent);
    return PopupComponent;
}());



/***/ }),

/***/ "../../../../../src/app/layout/site-layout/site-layout.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<app-header></app-header>\n<router-outlet></router-outlet>\n<app-footer></app-footer>\n<app-popup></app-popup>\n<simple-notifications [options]=\"options\"></simple-notifications>"

/***/ }),

/***/ "../../../../../src/app/layout/site-layout/site-layout.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/site-layout/site-layout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SiteLayoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_idle_service__ = __webpack_require__("../../../../../src/app/services/idle.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SiteLayoutComponent = (function () {
    function SiteLayoutComponent(idleService) {
        this.idleService = idleService;
        this.options = {
            timeOut: 2800,
            clickToClose: true,
            maxLength: 0,
            maxStack: 1,
            showProgressBar: true,
            pauseOnHover: true,
            animate: 'fromRight',
            position: ['top', 'right']
        };
    }
    SiteLayoutComponent.prototype.ngOnInit = function () {
        this.idleService.init();
    };
    SiteLayoutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-site-layout',
            template: __webpack_require__("../../../../../src/app/layout/site-layout/site-layout.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/site-layout/site-layout.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_idle_service__["a" /* IdleService */]])
    ], SiteLayoutComponent);
    return SiteLayoutComponent;
}());



/***/ }),

/***/ "../../../../../src/app/models/command.enum.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Command; });
var Command;
(function (Command) {
    Command["Start"] = "start";
    Command["Stop"] = "stop";
    Command["Edit"] = "edit";
    Command["Delete"] = "delete";
})(Command || (Command = {}));


/***/ }),

/***/ "../../../../../src/app/models/status.enum.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Status; });
var Status;
(function (Status) {
    Status["UNKNOWN"] = "UNKNOWN";
    Status["DEPLOYED"] = "DEPLOYED";
    Status["STARTED"] = "STARTED";
    Status["STOPPED"] = "STOPPED";
    Status["PAUSED"] = "PAUSED";
})(Status || (Status = {}));


/***/ }),

/***/ "../../../../../src/app/services/auth-guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.checkAuth = function (url) {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            localStorage.setItem('returnUrl', url);
            window.location.replace(this.authService.authenticationUrl);
            return false;
        }
    };
    AuthGuard.prototype.canActivate = function (params) {
        return this.checkAuth(params._routerState.url);
    };
    AuthGuard.prototype.canLoad = function (params) {
        return this.checkAuth(params.path);
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "../../../../../src/app/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_notifications_dist__ = __webpack_require__("../../../../angular2-notifications/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_notifications_dist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_notifications_dist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AuthService = (function () {
    function AuthService(http, notificationService, router) {
        this.http = http;
        this.notificationService = notificationService;
        this.router = router;
        this._isAuthenticated = false;
        this.redirectUri = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].redirectUrl;
        this.localAuthUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].authUrl;
        this.authenticationUrl = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiAuthUrl + '/connect/authorize' +
            '?client_id=' + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].applicationId +
            '&response_type=code' +
            '&redirect_uri=' + __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].redirectUrl;
    }
    AuthService.prototype.getAccessToken = function (code) {
        var _this = this;
        var queryParams = {
            code: code
        };
        this.http.get(this.localAuthUrl, { params: queryParams })
            .subscribe(function (response) { return _this.getWalletToken(response); });
    };
    AuthService.prototype.authenticate = function (data) {
        this.setToken(data);
        this._isAuthenticated = true;
        var returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
            localStorage.removeItem('returnUrl');
            this.router.navigate([returnUrl]);
        }
    };
    AuthService.prototype.login = function () {
        localStorage.setItem('returnUrl', window.location.pathname);
        window.location.replace(this.authenticationUrl);
    };
    AuthService.prototype.logout = function (redirectFlag) {
        var _this = this;
        if (redirectFlag === void 0) { redirectFlag = true; }
        var headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
        this.http.post(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrl + '/Auth/LogOut', '', { headers: headers }).subscribe(function (response) {
            localStorage.removeItem('token');
            _this._isAuthenticated = false;
            if (redirectFlag) {
                _this.login();
            }
        });
    };
    AuthService.prototype.getWalletToken = function (data) {
        var _this = this;
        var headers = {
            'application_id': __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].applicationId,
            'Authorization': data.token_type + ' ' + data.access_token
        };
        this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiAuthUrl + '/getlykkewallettoken', { headers: headers }).subscribe(function (response) { return _this.authenticate(response); });
    };
    AuthService.prototype.setToken = function (data) {
        localStorage.setItem('token', data.token);
    };
    AuthService.prototype.isAuthenticated = function () {
        return this._isAuthenticated;
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_angular2_notifications_dist__["NotificationsService"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "../../../../../src/app/services/crud.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CrudService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");






var CrudService = (function () {
    function CrudService(http, notificationsService) {
        this.http = http;
        this.notificationsService = notificationsService;
    }
    CrudService.prototype.get = function (url, queryParams) {
        if (queryParams) {
            this.setQueryParams(queryParams);
        }
        return this.http.get(__WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].storeApiUrl + url)
            .map(function (response) { return response; });
    };
    CrudService.prototype.put = function (url, data) {
        return this.http.put(__WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].storeApiUrl + url, data);
    };
    CrudService.prototype.post = function (url, file) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].storeApiUrl + url, file)
            .map(function (response) { return response; });
    };
    CrudService.prototype.delete = function (url, data) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_0__environments_environment__["a" /* environment */].storeApiUrl + url, data, this.requestOptions)
            .map(function (response) { return response; });
    };
    CrudService.prototype.setQueryParams = function (queryParams) {
        this.requestOptions.params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* URLSearchParams */]();
        this.requestOptions.params = queryParams;
    };
    CrudService.prototype.handleError = function (errorResponse) {
        this.notificationsService.error('Error', 'Error accoured.');
        console.error('ApiService::handleError', errorResponse);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw('Error');
    };
    return CrudService;
}());



/***/ }),

/***/ "../../../../../src/app/services/event.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var EventService = (function () {
    function EventService() {
        this.events = {};
    }
    EventService.prototype.addEvent = function (eventName) {
        this.events[eventName] = {};
        this.events[eventName].name = eventName;
        this.events[eventName].event = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.events[eventName].subscriptions = [];
    };
    EventService.prototype.subscribeToEvent = function (eventName, callback) {
        var subId = this.events[eventName].subscriptions.length;
        this.events[eventName].subscriptions[subId] = this.events[eventName].event.subscribe(callback);
        return subId;
    };
    EventService.prototype.unsubscribeToEvent = function (eventName, subId) {
        this.events[eventName].subscriptions[subId].unsubscribe();
    };
    EventService.prototype.emitEvent = function (eventName, params) {
        if (params === void 0) { params = {}; }
        this.events[eventName].event.emit(params);
    };
    EventService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], EventService);
    return EventService;
}());



/***/ }),

/***/ "../../../../../src/app/services/form-validation.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormValidationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");

var FormValidationService = (function () {
    function FormValidationService() {
    }
    FormValidationService.getValidatorErrorMessage = function (validatorName, validatorValue) {
        var config = {
            'required': 'Required',
            'invalidEmailAddress': 'Invalid email address.',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'invalidCompare': 'Password does not match the confirm password.',
            'invalidPhone': 'Phone number must be in following format: +XXXXXXXXXX.',
            'minlength': "Minimum length " + validatorValue.requiredLength + ".",
            'invalidNumber': 'Please insert a valid number value.'
        };
        return config[validatorName];
    };
    FormValidationService.emailValidator = function (control) {
        // RFC 2822 compliant regex
        if (control && (control.value == null || control.value.length === 0)) {
            return null;
        }
        else if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        }
        else {
            return { 'invalidEmailAddress': true };
        }
    };
    FormValidationService.passwordValidator = function (control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value && control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        }
        else {
            return { 'invalidPassword': true };
        }
    };
    // static phoneValidator(control) {
    //   if (control && (control.value == null || control.value.length === 0 )) {
    //     return null;
    //   } else if (control.value && control.value.indexOf('+') !== -1 && control.value.length >= 11) {
    //     return null;
    //   } else {
    //     return { 'invalidPhone': true };
    //   }
    // }
    FormValidationService.passwordCompareValidator = function (control) {
        if (control._parent && control._parent.controls.password.value && control._parent.controls.password.value === control._parent.controls.passwordConfirm.value) {
            return null;
        }
        else {
            return { 'invalidCompare': true };
        }
    };
    FormValidationService.numberValidator = function (control) {
        // RFC 2822 compliant regex
        if (control && !isNaN(control.value)) {
            return null;
        }
        else {
            control.setErrors({ 'invalidNumber': true });
            return { 'invalidNumber': true };
        }
    };
    FormValidationService.validate = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            if (control instanceof __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormControl */]) {
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* FormGroup */]) {
                _this.validate(control);
            }
        });
    };
    return FormValidationService;
}());



/***/ }),

/***/ "../../../../../src/app/services/idle.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_idle_core__ = __webpack_require__("../../../../@ng-idle/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var IdleService = (function () {
    function IdleService(idle, authService, router, eventService) {
        this.idle = idle;
        this.authService = authService;
        this.router = router;
        this.eventService = eventService;
        this.idle.setIdle(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].idleTime);
        this.idle.setTimeout(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].idleTimeout);
        this.idle.setInterrupts(__WEBPACK_IMPORTED_MODULE_2__ng_idle_core__["a" /* DEFAULT_INTERRUPTSOURCES */]);
    }
    IdleService.prototype.init = function () {
        var _this = this;
        this.startWatch();
        this.idle.onTimeout.subscribe(function () {
            var popupConfig = {
                name: 'sessionExpired',
                width: 370,
                title: 'Your session is expired',
                text: 'Please proceed to login.',
                btnCancelText: 'Log in'
            };
            _this.eventService.emitEvent('popup:close');
            _this.eventService.emitEvent('popup:open', popupConfig);
            _this.authService.logout(false);
        });
        this.idle.onTimeoutWarning.subscribe(function (countdown) {
            var popupConfig = {
                name: 'sessionWarning',
                width: 370,
                title: 'Your session is about expire',
                text: 'You will be logged off in ' + countdown + ' second due to inactivity.',
                btnCancelText: 'Keep me logged in',
                btnConfirmText: 'Logout'
            };
            _this.eventService.emitEvent('popup:open', popupConfig);
        });
        this.eventService.subscribeToEvent('popup:confirm', this.onPopupConfirm.bind(this));
        this.eventService.subscribeToEvent('popup:cancel', this.onPopupCancel.bind(this));
    };
    IdleService.prototype.startWatch = function () {
        this.idle.watch();
    };
    IdleService.prototype.onPopupConfirm = function (popupData) {
        switch (popupData.name) {
            case "sessionWarning":
                this.eventService.emitEvent('popup:close');
                this.authService.logout();
                break;
            case "sessionExpired":
                this.eventService.emitEvent('popup:close');
                this.authService.login();
                break;
        }
    };
    IdleService.prototype.onPopupCancel = function (popupData) {
        switch (popupData.name) {
            case "sessionWarning":
                this.eventService.emitEvent('popup:close');
                this.startWatch();
                break;
            case "sessionExpired":
                this.eventService.emitEvent('popup:close');
                this.authService.login();
                break;
        }
    };
    IdleService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ng_idle_core__["b" /* Idle */],
            __WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_1__event_service__["a" /* EventService */]])
    ], IdleService);
    return IdleService;
}());



/***/ }),

/***/ "../../../../../src/app/services/issuers.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IssuersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crud_service__ = __webpack_require__("../../../../../src/app/services/crud.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_notifications_dist__ = __webpack_require__("../../../../angular2-notifications/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_notifications_dist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_notifications_dist__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var IssuersService = (function (_super) {
    __extends(IssuersService, _super);
    function IssuersService(http, notificationService) {
        var _this = _super.call(this, http, notificationService) || this;
        _this._issuers = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]([]);
        _this.issuers = _this._issuers.asObservable();
        _this.getAllIssuers();
        return _this;
    }
    IssuersService.prototype.getAllIssuers = function () {
        var _this = this;
        this.get('/Issuers').subscribe(function (data) {
            _this.dataStore = data;
            _this._issuers.next(_this.dataStore.slice());
        }, function (error) { return console.log('Could not load issuers'); });
    };
    IssuersService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4_angular2_notifications_dist__["NotificationsService"]])
    ], IssuersService);
    return IssuersService;
}(__WEBPACK_IMPORTED_MODULE_1__crud_service__["a" /* CrudService */]));



/***/ }),

/***/ "../../../../../src/app/services/store.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crud_service__ = __webpack_require__("../../../../../src/app/services/crud.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_notifications__ = __webpack_require__("../../../../angular2-notifications/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_notifications__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var StoreService = (function (_super) {
    __extends(StoreService, _super);
    function StoreService(http, notificationService, eventService) {
        var _this = _super.call(this, http, notificationService) || this;
        _this.eventService = eventService;
        _this._algos = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]([]);
        _this.algosStore = [];
        _this.algos = _this._algos.asObservable();
        _this.bindEvents();
        return _this;
    }
    StoreService.prototype.bindEvents = function () {
        this.eventService.addEvent('algo:deployment:done');
        this.eventService.addEvent('algo:deployment:error');
        this.eventService.addEvent('algo:test:started');
        this.eventService.addEvent('algo:test:stopped');
        this.eventService.addEvent('algo:test:error');
        this.eventService.addEvent('algo:test:updated');
        this.eventService.addEvent('algo:delete:done');
        this.eventService.addEvent('algo:delete:error');
        this.eventService.addEvent('algo:log:done');
        this.eventService.addEvent('algo:log:error');
    };
    // algo endpoints
    StoreService.prototype.algoGetAll = function () {
        var _this = this;
        this.get('/v1/clientData/metadata')
            .subscribe(function (data) {
            _this.algosStore = data;
            _this._algos.next(_this.algosStore.slice());
            console.log('Response:' + JSON.stringify(data));
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('An error occurred:', err.error.message);
            }
            else {
                // Handle 'NotFound'
                _this.algosStore = [];
                _this._algos.next([]);
                console.log("Backend returned code " + err.status + ", body was: " + err.error);
            }
        });
    };
    StoreService.prototype.algoCreateDetails = function (algo, file) {
        var _this = this;
        this.post('/v1/clientData/metadata', algo)
            .subscribe(function (data) {
            if (!file) {
                _this.eventService.emitEvent('algo:test:updated');
                return false;
            }
            _this.algosStore = data;
            _this._algos.next([data]);
            var formData = new FormData();
            formData.append('Data', file);
            formData.append('AlgoId', data.Id);
            console.log('Algo created');
            _this.post('/v1/clientData/imageData/upload/binary', formData)
                .subscribe(function (res) {
                _this.post('/v1/management/deploy/binary', { AlgoId: data.Id })
                    .subscribe(function (res) {
                    _this.eventService.emitEvent('algo:deployment:done');
                }, function (err) {
                    if (err.error instanceof Error) {
                        _this.eventService.emitEvent('algo:deployment:error', { message: err.error.message });
                    }
                    else {
                        _this.eventService.emitEvent('algo:deployment:error', { message: err.error });
                    }
                });
            }, function (err) {
                if (err.error instanceof Error) {
                    console.log('An error occurred:', err.error.message);
                }
                else {
                    console.log("Backend returned code " + err.status + ", body was: " + err.error);
                }
            });
        }, function (err) {
            if (err.error instanceof Error) {
                console.log('An error occurred:', err.error.message);
            }
            else {
                _this.algosStore = [];
                _this._algos.next([]);
                console.log("Backend returned code " + err.status + ", body was: " + err.error);
            }
        });
    };
    StoreService.prototype.algoStart = function (algoId) {
        var _this = this;
        this.post('/v1/management/test/start', { AlgoId: algoId })
            .subscribe(function (res) {
            _this.eventService.emitEvent('algo:test:started');
        }, function (err) {
            if (err.error instanceof Error) {
                _this.eventService.emitEvent('algo:test:error', { message: err.error.message });
            }
            else {
                _this.eventService.emitEvent('algo:test:error', { message: err.error });
            }
        });
    };
    StoreService.prototype.algoStop = function (algoId) {
        var _this = this;
        this.post('/v1/management/test/stop', { AlgoId: algoId })
            .subscribe(function (res) {
            _this.eventService.emitEvent('algo:test:stopped');
        }, function (err) {
            if (err.error instanceof Error) {
                _this.eventService.emitEvent('algo:test:error', { message: err.error.message });
            }
            else {
                _this.eventService.emitEvent('algo:test:error', { message: err.error });
            }
        });
    };
    StoreService.prototype.algoDelete = function (algo) {
        var _this = this;
        this.post('/v1/clientData/metadata/cascadeDelete', algo)
            .subscribe(function (res) {
            _this.eventService.emitEvent('algo:delete:done', { algoId: algo.Id });
        }, function (err) {
            if (err.error instanceof Error) {
                _this.eventService.emitEvent('algo:delete:error', { message: err.error.message });
            }
            else {
                _this.eventService.emitEvent('algo:delete:error', { message: err.error });
            }
        });
    };
    StoreService.prototype.algoGetLog = function (algoId) {
        var _this = this;
        this.get("/v1/management/test/log?AlgoId=" + algoId)
            .subscribe(function (res) {
            _this.eventService.emitEvent('algo:log:done', { message: res.Log });
        }, function (err) {
            if (err.error instanceof Error) {
                _this.eventService.emitEvent('algo:log:error', { message: err.error.message });
            }
            else {
                _this.eventService.emitEvent('algo:log:error', { message: err.error });
            }
        });
    };
    StoreService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4_angular2_notifications__["NotificationsService"],
            __WEBPACK_IMPORTED_MODULE_5__event_service__["a" /* EventService */]])
    ], StoreService);
    return StoreService;
}(__WEBPACK_IMPORTED_MODULE_1__crud_service__["a" /* CrudService */]));



/***/ }),

/***/ "../../../../../src/app/services/token-interceptor.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TokenInterceptor = (function () {
    function TokenInterceptor() {
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var token = localStorage.getItem('token');
        if (token && request.url != __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].authUrl && request.url != __WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].tokenUrl) {
            request = request.clone({
                setHeaders: {
                    'Accept': 'application/json, */*',
                    'Authorization': 'Bearer ' + token
                }
            });
        }
        return next.handle(request);
    };
    TokenInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], TokenInterceptor);
    return TokenInterceptor;
}());



/***/ }),

/***/ "../../../../../src/app/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crud_service__ = __webpack_require__("../../../../../src/app/services/crud.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_notifications_dist__ = __webpack_require__("../../../../angular2-notifications/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_notifications_dist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_notifications_dist__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService(http, notificationService) {
        var _this = _super.call(this, http, notificationService) || this;
        _this._userData = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["a" /* BehaviorSubject */]({});
        _this.userData = _this._userData.asObservable();
        return _this;
        //this.getUserInfo();
    }
    UserService.prototype.getUserInfo = function () {
        var _this = this;
        this.get('/PersonalData ').subscribe(function (data) {
            _this.dataStore = data;
            _this._userData.next(__assign({}, _this.dataStore));
        }, function (error) { return console.log('Could not load user data.'); });
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4_angular2_notifications_dist__["NotificationsService"]])
    ], UserService);
    return UserService;
}(__WEBPACK_IMPORTED_MODULE_1__crud_service__["a" /* CrudService */]));



/***/ }),

/***/ "../../../../../src/app/settings/settings-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_component__ = __webpack_require__("../../../../../src/app/settings/settings.component.ts");


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__settings_component__["a" /* SettingsComponent */] }
];
var SettingsRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forChild(routes);


/***/ }),

/***/ "../../../../../src/app/settings/settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"my-lykke-equity-placeholder\" *ngIf=\"userData\">\r\n  <div class=\"small-container mt-83\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12 text-center pb-30\">\r\n        <span class=\"settings-profile-img\">\r\n          <img src=\"assets/img/assets/lykke.png\" alt=\"\">\r\n        </span>\r\n      </div>\r\n      <div class=\"col-xs-12\">\r\n        <h1 class=\"heading-lg gray-dark text-center\">Profile Settings</h1>\r\n      </div>\r\n    </div>\r\n    <!--<div class=\"spinner\">-->\r\n      <!--<div class=\"spinner__inside\"></div>-->\r\n    <!--</div>-->\r\n    <div class=\"row no-gutters pt-50\">\r\n      <!--<div class=\"col-xs-12 border-top-gray-light\">-->\r\n        <!--<div class=\"row no-gutters pt-15 pb-15\">-->\r\n          <!--<div class=\"col-xs-6\"><span class=\"text-lgb\">Full Name</span></div>-->\r\n          <!--<div class=\"col-xs-6 text-right\"><span class=\"text-md gray-light\">Daniel Dimitrov</span></div>-->\r\n        <!--</div>-->\r\n      <!--</div>-->\r\n      <!--<div class=\"col-xs-12 border-top-gray-light\">-->\r\n        <!--<div class=\"row no-gutters pt-15 pb-15\">-->\r\n          <!--<div class=\"col-xs-6\"><span class=\"text-lgb\">Email</span></div>-->\r\n          <!--<div class=\"col-xs-6 text-right\"><span class=\"text-md gray-light\">daniel.dimitrov@primeholding.com</span></div>-->\r\n        <!--</div>-->\r\n      <!--</div>-->\r\n      <!--<div class=\"col-xs-12 border-top-gray-light border-bottom-gray-light\">-->\r\n        <!--<div class=\"row no-gutters pt-15 pb-15\">-->\r\n          <!--<div class=\"col-xs-6\"><span class=\"text-lgb\">Contact phone number</span></div>-->\r\n          <!--<div class=\"col-xs-6 text-right\"><span class=\"text-md gray-light\">+359993399223</span></div>-->\r\n        <!--</div>-->\r\n      <!--</div>-->\r\n      <!--<div class=\"col-xs-12 border-top-gray-light border-bottom-gray-light\">-->\r\n        <!--<div class=\"row no-gutters pt-15 pb-15\">-->\r\n          <!--<div class=\"col-xs-6\"><span class=\"text-lgb\">Country</span></div>-->\r\n          <!--<div class=\"col-xs-6 text-right\"><span class=\"text-md gray-light\">Bulgaria</span></div>-->\r\n        <!--</div>-->\r\n      <!--</div>-->\r\n      <!--<div class=\"col-xs-12 border-top-gray-light border-bottom-gray-light\">-->\r\n        <!--<div class=\"row no-gutters pt-15 pb-15\">-->\r\n          <!--<div class=\"col-xs-6\"><span class=\"text-lgb\">City</span></div>-->\r\n          <!--<div class=\"col-xs-6 text-right\"><span class=\"text-md gray-light\">Plovdiv</span></div>-->\r\n        <!--</div>-->\r\n      <!--</div>-->\r\n      <!--<div class=\"col-xs-12 border-top-gray-light border-bottom-gray-light\">-->\r\n        <!--<div class=\"row no-gutters pt-15 pb-15\">-->\r\n          <!--<div class=\"col-xs-6\"><span class=\"text-lgb\">Zip</span></div>-->\r\n          <!--<div class=\"col-xs-6 text-right\"><span class=\"text-md gray-light\">4000</span></div>-->\r\n        <!--</div>-->\r\n      <!--</div>-->\r\n      <!--<div class=\"col-xs-12 border-top-gray-light border-bottom-gray-light\">-->\r\n        <!--<div class=\"row no-gutters pt-15 pb-15\">-->\r\n          <!--<div class=\"col-xs-6\"><span class=\"text-lgb\">Base asset</span></div>-->\r\n          <!--<div class=\"col-xs-6 text-right\"><span class=\"text-md gray-light\">USD</span></div>-->\r\n        <!--</div>-->\r\n      <!--</div>-->\r\n      <!--<div class=\"col-xs-12 border-top-gray-light border-bottom-gray-light\">-->\r\n        <!--<div class=\"row no-gutters pt-15 pb-15\">-->\r\n          <!--<div class=\"col-xs-6\"><span class=\"text-lgb\">Refund</span></div>-->\r\n          <!--<div class=\"col-xs-6 text-right\"><span class=\"text-md gray-light\">06895c18a8244123a9efd791597e92</span></div>-->\r\n        <!--</div>-->\r\n      <!--</div>-->\r\n      <!--<div class=\"col-xs-12 border-top-gray-light border-bottom-gray-light\">-->\r\n        <!--<div class=\"row no-gutters pt-15 pb-15\">-->\r\n          <!--<div class=\"col-xs-4 text-left\"><a href=\"javascript:;\" class=\"text-lgb\">Terms of use</a></div>-->\r\n          <!--<div class=\"col-xs-4 text-center\"><a href=\"javascript:;\" class=\"text-lgb\">Call support</a></div>-->\r\n          <!--<div class=\"col-xs-4 text-right\"><a href=\"javascript:;\" class=\"text-lgb\">Mail support</a></div>-->\r\n        <!--</div>-->\r\n      <!--</div>-->\r\n      <ul class=\"underline-list\">\r\n        <li class=\"relative\">\r\n          <span class=\"option-name pr-60\">Full Name</span>\r\n          <span class=\"option-value text-md blue-light pr-60\">{{userData.FullName}}</span>\r\n        </li>\r\n        <li class=\"relative\">\r\n          <span class=\"option-name pr-60\">Email</span>\r\n          <span class=\"option-value text-md blue-light pr-60\">{{userData.Email}}</span>\r\n        </li>\r\n        <li class=\"relative\">\r\n          <span class=\"option-name pr-60\">Contact phone number</span>\r\n          <span class=\"option-value text-md blue-light pr-60\">{{userData.Phone}}</span>\r\n        </li>\r\n        <li class=\"relative\">\r\n          <span class=\"option-name pr-60\">Country</span>\r\n          <span class=\"option-value text-md blue-light pr-60\">{{userData.Country}}</span>\r\n        </li>\r\n        <li class=\"relative\">\r\n          <span class=\"option-name pr-60\">City</span>\r\n          <span class=\"option-value text-md blue-light pr-60\">{{userData.City}}</span>\r\n        </li>\r\n        <li class=\"relative\">\r\n          <span class=\"option-name pr-60\">Zip</span>\r\n          <span class=\"option-value text-md blue-light pr-60\">{{userData.Zip}}</span>\r\n        </li>\r\n        <li class=\"relative\">\r\n          <span class=\"option-name pr-60\">Base asset</span>\r\n          <span class=\"option-value text-md blue-light pr-60\">USD</span>\r\n          <span class=\"icon--copy_thin icon-copy-style blue-light\"></span>\r\n          <!--TODO CHANGE ICON-->\r\n        </li>\r\n        <!--TODO RESEARCH API FOR REFUND ADDRESS-->\r\n        <li class=\"relative\">\r\n          <span class=\"option-name pr-60\">Refund</span>\r\n          <span class=\"option-value text-md blue-light pr-60\">06895c18a8244123a9efd791597e92</span>\r\n          <span class=\"icon--copy_thin icon-copy-style blue-light\"></span>\r\n          <!--TODO CHANGE ICON-->\r\n        </li>\r\n      </ul>\r\n    </div>\r\n    <div class=\"row no-gutters border-bottom-gray-light pb-40\">\r\n      <div class=\"col-xs-4 text-left\"><a href=\"javascript:;\" class=\"text-lgb\">Terms of use</a></div>\r\n      <div class=\"col-xs-4 text-center\"><a href=\"javascript:;\" class=\"text-lgb\">Call support</a></div>\r\n      <div class=\"col-xs-4 text-right\"><a href=\"javascript:;\" class=\"text-lgb\">Mail support</a></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/settings/settings.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/settings/settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__("../../../../../src/app/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SettingsComponent = (function () {
    function SettingsComponent(userService) {
        this.userService = userService;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.userData.subscribe(function (data) {
            _this.userData = data;
        });
    };
    SettingsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__("../../../../../src/app/settings/settings.component.html"),
            styles: [__webpack_require__("../../../../../src/app/settings/settings.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/settings/settings.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_routing_module__ = __webpack_require__("../../../../../src/app/settings/settings-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_component__ = __webpack_require__("../../../../../src/app/settings/settings.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// COMPONENTS


var SettingsModule = (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__settings_routing_module__["a" /* SettingsRouting */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__["a" /* SharedModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__settings_component__["a" /* SettingsComponent */]
            ],
            providers: []
        })
    ], SettingsModule);
    return SettingsModule;
}());



/***/ }),

/***/ "../../../../../src/app/shared/dropdown/clickOutside.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClickOutsideDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ClickOutsideDirective = (function () {
    function ClickOutsideDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.clickOutside = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ClickOutsideDirective.prototype.onClick = function (event, targetElement) {
        if (!targetElement) {
            return;
        }
        var clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ClickOutsideDirective.prototype, "clickOutside", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('document:click', ['$event', '$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent, HTMLElement]),
        __metadata("design:returntype", void 0)
    ], ClickOutsideDirective.prototype, "onClick", null);
    ClickOutsideDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[clickOutside]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], ClickOutsideDirective);
    return ClickOutsideDirective;
}());



/***/ }),

/***/ "../../../../../src/app/shared/dropdown/dropdown.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\" *ngIf=\"dropdownData\" [ngClass]=\"{'open': isOpen}\" (clickOutside)=\"closeDropdown()\">\r\n  <button [ngClass]=\"buttonOptions.classNames\" (click)=\"toggleDropdown()\">\r\n    <i class=\"icon {{buttonOptions.iconClass}}\" *ngIf=\"buttonOptions.hasIcon\"></i>\r\n    <span *ngIf=\"buttonOptions.buttonText\">{{buttonOptions.buttonText}}</span>\r\n  </button>\r\n\r\n  <ul class=\"dropdown-menu actions-list\" *ngIf=\"isOpen && !dropdownOptions.hasGroups\">\r\n    <li class=\"list-item\" *ngFor=\"let item of dropdownData\">\r\n      <a [routerLink]=\"item.url\">\r\n        <i class=\"icon {{item.icon}}\" *ngIf=\"item.icon\"></i>\r\n        {{item.name}}\r\n      </a>\r\n    </li>\r\n    <ng-template [ngIf]=\"dropdownOptions.hasFooterLinks\">\r\n      <hr/>\r\n      <li class=\"list-item\" *ngFor=\"let item of footerLinksData\">\r\n        <a [routerLink]=\"item.url\">\r\n          <i class=\"icon {{item.icon}}\" *ngIf=\"item.icon\"></i>\r\n          {{item.name}}\r\n        </a>\r\n      </li>\r\n    </ng-template>\r\n  </ul>\r\n\r\n  <div class=\"wallet-dropdown-items-container\" *ngIf=\"isOpen && dropdownOptions.hasGroups\">\r\n    <ul class=\"actions-list\">\r\n      <li class=\"list-item\">\r\n        <a [routerLink]=\"[walletName, dropdownData.Id]\" class=\"wallet-dropdown-link\">\r\n          <i class=\"icon icon--trading_sell\"></i>\r\n          Asset Details\r\n        </a>\r\n      </li>\r\n    </ul>\r\n    <h3 class=\"action-list-title\" *ngIf=\"(dropdownData.SwiftDeposit || dropdownData.BlockchainDeposit || dropdownData.VisaDeposit)\">DEPOSITE</h3>\r\n    <ul class=\"actions-list\" *ngIf=\"(dropdownData.SwiftDeposit || dropdownData.BlockchainDeposit || dropdownData.VisaDeposit)\">\r\n      <li class=\"list-item\" *ngIf=\"dropdownData.SwiftDeposit\">\r\n        <a [routerLink]=\"['/wallets/trading/deposit/swift', dropdownData.Id]\" class=\"wallet-dropdown-link\">\r\n          <i class=\"icon icon--deposit_swift\"></i>\r\n          SWIFT\r\n        </a>\r\n      </li>\r\n      <li class=\"list-item\" *ngIf=\"dropdownData.BlockchainDeposit\">\r\n        <a [routerLink]=\"['deposit' , 'blockchain', walletName, dropdownData.Id]\" class=\"wallet-dropdown-link\">\r\n          <i class=\"icon icon--deposit_bl_transfer\"></i>\r\n          Blockchain Transfer\r\n        </a>\r\n      </li>\r\n      <li class=\"list-item\" *ngIf=\"dropdownData.VisaDeposit\">\r\n        <a [routerLink]=\"['/wallets/trading/deposit/credit-card', dropdownData.Id]\" class=\"wallet-dropdown-link\">\r\n          <i class=\"icon icon--deposit_credit_card\"></i>\r\n          Credit Card\r\n        </a>\r\n      </li>\r\n    </ul>\r\n    <h3 class=\"action-list-title\" *ngIf=\"!dropdownData.HideWithdraw && (dropdownData.BlockchainWithdrawal || dropdownData.SwiftWithdrawal)\">WITHDRAW</h3>\r\n    <ul class=\"actions-list\" *ngIf=\"!dropdownData.HideWithdraw && (dropdownData.BlockchainWithdrawal || dropdownData.SwiftWithdrawal)\">\r\n      <li class=\"list-item\" *ngIf=\"dropdownData.BlockchainWithdrawal\">\r\n        <a [routerLink]=\"['/wallets/trading/withdraw/swift', dropdownData.Id]\" class=\"wallet-dropdown-link\">\r\n          <i class=\"icon icon--deposit_swift\"></i>\r\n          SWIFT\r\n        </a>\r\n      </li>\r\n      <li class=\"list-item\" *ngIf=\"dropdownData.SwiftWithdrawal\">\r\n        <a [routerLink]=\"['withdraw', 'blockchain', walletName, dropdownData.Id]\" class=\"wallet-dropdown-link\">\r\n          <i class=\"icon icon--deposit_bl_transfer\"></i>\r\n          Blockchain Transfer\r\n        </a>\r\n      </li>\r\n    </ul>\r\n    <h3 class=\"action-list-title\" *ngIf=\"dropdownData.SellScreen\">TRADING</h3>\r\n    <ul class=\"actions-list\" *ngIf=\"dropdownData.SellScreen\">\r\n      <li class=\"list-item\">\r\n        <a [routerLink]=\"['']\" class=\"wallet-dropdown-link\">\r\n          <i class=\"icon icon--trading_sell\"></i>\r\n          <!--// TODO ADD SELL URL-->\r\n          Sell\r\n        </a>\r\n      </li>\r\n      <li class=\"list-item\">\r\n        <a [routerLink]=\"['']\" class=\"wallet-dropdown-link\">\r\n          <i class=\"icon icon--trading_buy\"></i>\r\n          Buy\r\n          <!--// TODO ADD BUY URL-->\r\n        </a>\r\n      </li>\r\n    </ul>\r\n    <h3 class=\"action-list-title\" *ngIf=\"dropdownData.Id == 'LKK' || dropdownData.Id == 'LKK1Y'\">FORWARD SETTLEMENT</h3>\r\n    <ul class=\"actions-list\" *ngIf=\"dropdownData.Id == 'LKK' || dropdownData.Id == 'LKK1Y'\">\r\n      <li class=\"list-item\">\r\n        <a [routerLink]=\"['/wallets/trading/settle', dropdownData.Id]\" class=\"wallet-dropdown-link\">\r\n          <i class=\"icon icon--settle_coins\"></i>\r\n          Settle LKK\r\n        </a>\r\n      </li>\r\n      <li class=\"list-item\">\r\n        <a [routerLink]=\"['']\" class=\"wallet-dropdown-link\">\r\n          <i class=\"icon icon--trading_buy\"></i>\r\n          Buy Lykke Shares\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n\r\n  <!--<div class=\"wallet-dropdown-items-container\" *ngIf=\"isOpen && dropdownOptions.hasGroups\">-->\r\n    <!--<div *ngFor=\"let groupItem of dropdownData\">-->\r\n      <!--<h3 class=\"action-list-title\" *ngIf=\"groupItem.groupName\">{{groupItem.groupName}}</h3>-->\r\n      <!--<ul class=\"actions-list\">-->\r\n        <!--<li class=\"list-item\" *ngFor=\"let item of groupItem.items\">-->\r\n          <!--<a [routerLink]=\"item.url\" class=\"wallet-dropdown-link\">-->\r\n            <!--<i class=\"icon {{item.icon}}\" *ngIf=\"item.icon\"></i>-->\r\n            <!--{{item.name}}-->\r\n          <!--</a>-->\r\n        <!--</li>-->\r\n      <!--</ul>-->\r\n    <!--</div>-->\r\n  <!--</div>-->\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/shared/dropdown/dropdown.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/dropdown/dropdown.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropdownComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DropdownComponent = (function () {
    function DropdownComponent(eventService) {
        this.eventService = eventService;
    }
    // TODO add default options for each @input
    DropdownComponent.prototype.ngOnChanges = function () {
        if (this.walletName) {
            this.walletName = this.walletName.replace(/\s/g, '-');
        }
    };
    DropdownComponent.prototype.toggleDropdown = function () {
        this.isOpen = !this.isOpen;
    };
    DropdownComponent.prototype.closeDropdown = function () {
        this.isOpen = false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], DropdownComponent.prototype, "buttonOptions", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], DropdownComponent.prototype, "dropdownOptions", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], DropdownComponent.prototype, "dropdownData", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], DropdownComponent.prototype, "footerLinksData", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], DropdownComponent.prototype, "walletName", void 0);
    DropdownComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dropdown',
            template: __webpack_require__("../../../../../src/app/shared/dropdown/dropdown.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/dropdown/dropdown.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_event_service__["a" /* EventService */]])
    ], DropdownComponent);
    return DropdownComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/error-messages/error-messages.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorMessagesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_form_validation_service__ = __webpack_require__("../../../../../src/app/services/form-validation.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ErrorMessagesComponent = (function () {
    function ErrorMessagesComponent() {
    }
    Object.defineProperty(ErrorMessagesComponent.prototype, "errorMessage", {
        get: function () {
            if (this.control && this.control.errors) {
                for (var propertyName in this.control.errors) {
                    // if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                    if (this.control.errors.hasOwnProperty(propertyName) && (this.control.dirty || this.control.touched)) {
                        return __WEBPACK_IMPORTED_MODULE_2__services_form_validation_service__["a" /* FormValidationService */].getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
                    }
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */])
    ], ErrorMessagesComponent.prototype, "control", void 0);
    ErrorMessagesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-error-messages',
            template: "<div *ngIf=\"errorMessage !== null\" class=\"text-danger\">* {{errorMessage}}</div>"
        }),
        __metadata("design:paramtypes", [])
    ], ErrorMessagesComponent);
    return ErrorMessagesComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/form-success/form-success.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"success-wrapper\" *ngIf=\"_showMessage && messageConfig\">\r\n  <div class=\"success-container text-center\">\r\n    <img src=\"/assets/img/success-icn.svg\" alt=\"success message\"/>\r\n    <h1 class=\"mt-30 heading-md gray-dark bold\">{{messageConfig.messageText}}</h1>\r\n    <h2 class=\"heading-lgm mt-20\" *ngIf=\"messageConfig.transactionAmount\">{{messageConfig.transactionAmount}}</h2>\r\n    <div class=\"buttons-wrapper mt-40 mb-40\">\r\n      <!--// TODO SET BUTON OPTIONS -->\r\n      <button class=\"button button-default\">\r\n        <i class=\"icon icon--details fs-20\"></i>\r\n        View Details\r\n      </button>\r\n      <button class=\"button button-default\">\r\n        <i class=\"icon icon--save_template fs-20\"></i>\r\n        Repeat operation\r\n      </button>\r\n      <button class=\"button button-default\">\r\n        <i class=\"icon icon--save_template fs-20\"></i>\r\n        Save to templates\r\n      </button>\r\n      <!--<button class=\"button button-default\">-->\r\n        <!--<i class=\"icon icon&#45;&#45;create\"></i>-->\r\n        <!--Create Another-->\r\n      <!--</button>-->\r\n    </div>\r\n    <button class=\"button button-blue\" (click)=\"onLocationBack()\">{{messageConfig.backButtonText}}</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/shared/form-success/form-success.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/form-success/form-success.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormSuccessComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FormSuccessComponent = (function () {
    function FormSuccessComponent(eventService, location) {
        this.eventService = eventService;
        this.location = location;
        this._showMessage = false;
        this.bindEvents();
    }
    FormSuccessComponent.prototype.ngOnInit = function () {
        this.eventService.subscribeToEvent('success:show', this.onMessageOpen.bind(this));
        this.eventService.subscribeToEvent('success:hide', this.onMessageClose.bind(this));
    };
    FormSuccessComponent.prototype.ngOnDestroy = function () {
        this.onMessageClose();
    };
    FormSuccessComponent.prototype.bindEvents = function () {
        this.eventService.addEvent('success:show');
        this.eventService.addEvent('success:hide');
    };
    FormSuccessComponent.prototype.onMessageOpen = function (data) {
        this.messageConfig = data;
        this._showMessage = true;
    };
    FormSuccessComponent.prototype.onMessageClose = function () {
        this.messageConfig = null;
        this._showMessage = false;
    };
    FormSuccessComponent.prototype.onLocationBack = function () {
        this.location.back();
    };
    FormSuccessComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-form-success',
            template: __webpack_require__("../../../../../src/app/shared/form-success/form-success.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/form-success/form-success.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_event_service__["a" /* EventService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"]])
    ], FormSuccessComponent);
    return FormSuccessComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/qr/qr.component.html":
/***/ (function(module, exports) {

module.exports = "<canvas class=\"qr-placeholder\" #qr></canvas>\r\n"

/***/ }),

/***/ "../../../../../src/app/shared/qr/qr.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QrComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var QrComponent = (function () {
    function QrComponent() {
    }
    QrComponent.prototype.ngOnInit = function () {
        this.qrCodeInstance = new QRious({
            element: this.qr.nativeElement,
            value: this.data,
            size: this.size
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], QrComponent.prototype, "data", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], QrComponent.prototype, "size", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('qr'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], QrComponent.prototype, "qr", void 0);
    QrComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-qr',
            template: __webpack_require__("../../../../../src/app/shared/qr/qr.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], QrComponent);
    return QrComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_form_validation_service__ = __webpack_require__("../../../../../src/app/services/form-validation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__qr_qr_component__ = __webpack_require__("../../../../../src/app/shared/qr/qr.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__error_messages_error_messages_component__ = __webpack_require__("../../../../../src/app/shared/error-messages/error-messages.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__form_success_form_success_component__ = __webpack_require__("../../../../../src/app/shared/form-success/form-success.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dropdown_dropdown_component__ = __webpack_require__("../../../../../src/app/shared/dropdown/dropdown.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dropdown_clickOutside_directive__ = __webpack_require__("../../../../../src/app/shared/dropdown/clickOutside.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_popup_popup_component__ = __webpack_require__("../../../../../src/app/components/popup/popup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__table_table_component__ = __webpack_require__("../../../../../src/app/shared/table/table.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_router__["c" /* RouterModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_1__services_form_validation_service__["a" /* FormValidationService */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__qr_qr_component__["a" /* QrComponent */],
                __WEBPACK_IMPORTED_MODULE_3__error_messages_error_messages_component__["a" /* ErrorMessagesComponent */],
                __WEBPACK_IMPORTED_MODULE_6__form_success_form_success_component__["a" /* FormSuccessComponent */],
                __WEBPACK_IMPORTED_MODULE_7__dropdown_dropdown_component__["a" /* DropdownComponent */],
                __WEBPACK_IMPORTED_MODULE_8__dropdown_clickOutside_directive__["a" /* ClickOutsideDirective */],
                __WEBPACK_IMPORTED_MODULE_10__components_popup_popup_component__["a" /* PopupComponent */],
                __WEBPACK_IMPORTED_MODULE_11__table_table_component__["a" /* TableComponent */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__qr_qr_component__["a" /* QrComponent */],
                __WEBPACK_IMPORTED_MODULE_7__dropdown_dropdown_component__["a" /* DropdownComponent */],
                __WEBPACK_IMPORTED_MODULE_3__error_messages_error_messages_component__["a" /* ErrorMessagesComponent */],
                __WEBPACK_IMPORTED_MODULE_6__form_success_form_success_component__["a" /* FormSuccessComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_popup_popup_component__["a" /* PopupComponent */],
                __WEBPACK_IMPORTED_MODULE_11__table_table_component__["a" /* TableComponent */],
                __WEBPACK_IMPORTED_MODULE_8__dropdown_clickOutside_directive__["a" /* ClickOutsideDirective */]
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "../../../../../src/app/shared/table/table.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <!--TODO IF NO DATA-->\r\n  <!--<div class=\"spinner\" *ngIf=\"!assetHistory\">-->\r\n    <!--<div class=\"spinner__inside\"></div>-->\r\n  <!--</div>-->\r\n  <!--<div class=\"table-borders\" *ngIf=\"assetHistory\">-->\r\n  <div class=\"table-borders\">\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-1 col-xs-1\"><h3 class=\"table-heading text-left\">Wallet</h3></div>\r\n      <div class=\"col-lg-3 col-xs-3\"></div>\r\n      <div class=\"col-lg-2 col-xs-2\"><h3 class=\"table-heading text-left\">Date</h3></div>\r\n      <div class=\"col-lg-2 col-xs-2\"><h3 class=\"table-heading text-left\">Operation</h3></div>\r\n      <div class=\"col-lg-2 col-xs-2\"><h3 class=\"table-heading text-left\">Type</h3></div>\r\n      <div class=\"col-lg-1 col-xs-1\"><h3 class=\"table-heading text-right\">Amount</h3></div>\r\n      <div class=\"col-xs-1\"></div>\r\n    </div>\r\n\r\n    <div class=\"row cursor-pointer\">\r\n      <div class=\"col-lg-1  col-xs-1 currency-table-data\">\r\n            <span class=\"lkk-icon-wrapper\">\r\n              <img src=\"../../../../assets/img/lkk_icon.png\" alt=\"\">\r\n            </span>\r\n      </div>\r\n      <!--TODO From where to get account type-->\r\n      <div class=\"col-lg-3  col-xs-3 currency-table-data\">\r\n        <span class=\"table-text\">\r\n          Wallet\r\n        </span>\r\n      </div>\r\n      <div class=\"col-lg-2  col-xs-2 currency-table-data text-left\">\r\n        <span class=\"table-text\">DATE</span>\r\n      </div>\r\n      <div class=\"col-lg-2  col-xs-2 currency-table-data text-left\">\r\n        <span class=\"table-text\">OPERATION</span>\r\n      </div>\r\n      <div class=\"col-lg-2  col-xs-2 currency-table-data text-left\">\r\n        <span class=\"table-text\">Type</span>\r\n      </div>\r\n      <div class=\"col-lg-1  col-xs-1 currency-table-data text-right\">\r\n        <span class=\"table-text\">XXXXX</span>\r\n      </div>\r\n      <div class=\"col-lg-1  col-xs-1 currency-table-data text-right\">\r\n        <span class=\"table-text\">icon</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/shared/table/table.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/table/table.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TableComponent = (function () {
    // TODO
    // create inputs and otputs for events
    // create dynamic headings based on array with classes and heading text
    // two types of buttons
    // dropdown or open aside
    function TableComponent() {
    }
    TableComponent.prototype.ngOnInit = function () {
    };
    TableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-table',
            template: __webpack_require__("../../../../../src/app/shared/table/table.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/table/table.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TableComponent);
    return TableComponent;
}());



/***/ }),

/***/ "../../../../../src/app/store/algo-details/algo-details.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container algo-details-placeholder pt-10 pb-30\">\r\n  <div class=\"row\">\r\n\r\n    <div class=\"algo-details\">\r\n      <div class=\"col-xs-3\">\r\n        <span class=\"heading-sm\">{{algo.Name}}</span>\r\n      </div>\r\n      <div class=\"col-xs-4\">\r\n        <span class=\"text-lg\">{{algo.Description}}</span>\r\n      </div>\r\n      <div class=\"col-xs-5 text-right\">\r\n        <app-commands [algo]=\"algo\"></app-commands>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row gray-bg\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12\">\r\n        <h2 class=\"text-lg pt-10 pb-10\">Terminal</h2>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row terminal\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12\">\r\n        <textarea placeholder=\"Log goes here...\" class=\"mt-30\" [ngModel]=\"log\"></textarea>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/store/algo-details/algo-details.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/store/algo-details/algo-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlgoDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_service__ = __webpack_require__("../../../../../src/app/services/store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__ = __webpack_require__("../../../../angular2-notifications/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_notifications__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AlgoDetailsComponent = (function () {
    function AlgoDetailsComponent(storeService, eventService, notificationService) {
        this.storeService = storeService;
        this.eventService = eventService;
        this.notificationService = notificationService;
        this.algo = this.storeService.activeAlgo;
        this.storeService.algoGetLog(this.algo.Id);
        this.subscriptions = new Array();
        this.logTimeout = null;
    }
    AlgoDetailsComponent.prototype.ngOnInit = function () {
        this.subscriptions.push({
            event: 'algo:test:started',
            id: this.eventService.subscribeToEvent('algo:test:started', this.onAlgoStatusChanged.bind(this))
        });
        this.subscriptions.push({
            event: 'algo:test:stopped',
            id: this.eventService.subscribeToEvent('algo:test:stopped', this.onAlgoStatusChanged.bind(this))
        });
        this.subscriptions.push({
            event: 'algo:delete:done',
            id: this.eventService.subscribeToEvent('algo:delete:done', this.onAlgoStatusChanged.bind(this))
        });
        this.subscriptions.push({
            event: 'algo:log:done',
            id: this.eventService.subscribeToEvent('algo:log:done', this.onAlgoLogDone.bind(this))
        });
        this.subscriptions.push({
            event: 'algo:log:error',
            id: this.eventService.subscribeToEvent('algo:log:error', this.onAlgoLogError.bind(this))
        });
    };
    AlgoDetailsComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        clearTimeout(this.logTimeout);
        this.subscriptions.forEach(function (value) { return _this.eventService.unsubscribeToEvent(value.event, value.id); });
    };
    AlgoDetailsComponent.prototype.onAlgoLogDone = function (log) {
        var _this = this;
        this.log = log.message;
        // Setting a timeout since a successful execution of algoGetLog will result
        // in this method getting invoked again. (See ngOnInit)
        this.logTimeout = setTimeout(function () {
            _this.storeService.algoGetLog(_this.algo.Id);
        }, 5000);
    };
    AlgoDetailsComponent.prototype.onAlgoLogError = function (error) {
        this.notificationService.error('Error', error.ErrorMessage);
    };
    AlgoDetailsComponent.prototype.onAlgoStatusChanged = function () {
        this.storeService.algoGetLog(this.algo.Id);
    };
    AlgoDetailsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-algo-detail',
            template: __webpack_require__("../../../../../src/app/store/algo-details/algo-details.component.html"),
            styles: [__webpack_require__("../../../../../src/app/store/algo-details/algo-details.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_store_service__["a" /* StoreService */], __WEBPACK_IMPORTED_MODULE_2__services_event_service__["a" /* EventService */], __WEBPACK_IMPORTED_MODULE_3_angular2_notifications__["NotificationsService"]])
    ], AlgoDetailsComponent);
    return AlgoDetailsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/store/algo-edit/algo-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container algo-edit-placeholder pt-10 pb-30\">\n  <div class=\"row\">\n    <div class=\"col-xs-12\">\n      <h1 class=\"heading-sm text-center mt-40 mb-60\">Edit algo</h1>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-3\"></div>\n    <div class=\"col-xs-6 text-center\">\n      <form [formGroup]=\"updateFormGroup\">\n        <mat-form-field>\n          <input matInput placeholder=\"Algo name\" formControlName=\"name\" required>\n        </mat-form-field>\n        <br>\n        <mat-form-field>\n          <textarea matInput placeholder=\"Description\" matTextareaAutosize matAutosizeMinRows=\"2\" matAutosizeMaxRows=\"5\" formControlName=\"description\"></textarea>\n        </mat-form-field>\n      </form>\n    </div>\n    <div class=\"col-md-3\"></div>\n  </div>\n\n  <div class=\"row mt-60\">\n    <div class=\"col-xs-12 text-center\">\n      <button class=\"button button-blue\" (click)=\"update()\" [disabled]=\"!updateFormGroup.valid\">Save algo</button>\n    </div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/store/algo-edit/algo-edit.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/store/algo-edit/algo-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlgoEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_service__ = __webpack_require__("../../../../../src/app/services/store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AlgoEditComponent = (function () {
    function AlgoEditComponent(storeService, eventService, router, formBuilder) {
        this.storeService = storeService;
        this.eventService = eventService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.eventService.subscribeToEvent('algo:test:updated', this.onAlgoUpdated.bind(this));
    }
    AlgoEditComponent.prototype.ngOnInit = function () {
        this.updateFormGroup = this.formBuilder.group({
            id: [''],
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* Validators */].required],
            description: ['']
        });
        this.updateFormGroup.setValue({
            id: this.storeService.activeAlgo.Id,
            name: this.storeService.activeAlgo.Name,
            description: this.storeService.activeAlgo.Description
        });
    };
    AlgoEditComponent.prototype.onAlgoUpdated = function () {
        this.router.navigate(["store/algo-list"]);
    };
    AlgoEditComponent.prototype.update = function () {
        if (this.updateFormGroup.controls.name.value) {
            var algo = {
                Id: this.storeService.activeAlgo.Id,
                Name: this.updateFormGroup.controls.name.value,
                Description: this.updateFormGroup.controls.description.value
            };
            this.storeService.algoCreateDetails(algo);
        }
    };
    AlgoEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-algo-edit',
            template: __webpack_require__("../../../../../src/app/store/algo-edit/algo-edit.component.html"),
            styles: [__webpack_require__("../../../../../src/app/store/algo-edit/algo-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_3__services_event_service__["a" /* EventService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */]])
    ], AlgoEditComponent);
    return AlgoEditComponent;
}());



/***/ }),

/***/ "../../../../../src/app/store/algo-list/algo-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container algo-list-placeholder pt-10 pb-30\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <h2 class=\"heading-lg pt-10 pb-10\">My Algos</h2>\n    </div>\n  </div>\n\n  <div class=\"row algo-list\">\n    <div class=\"col-md-12\">\n        <mat-table #table [dataSource]=\"dataSource\" *ngIf=\"showAlgoList\">\n            \n                <!-- Name Column -->\n                <ng-container matColumnDef=\"Name\">\n                  <mat-header-cell *matHeaderCellDef class=\"text-md\"> NAME </mat-header-cell>\n                  <mat-cell *matCellDef=\"let algo\"> \n                    <a href=\"#\" (click)=\"details(algo)\"> {{algo.Name}} </a></mat-cell>\n                </ng-container>\n            \n                <!-- Description Column -->\n                <ng-container matColumnDef=\"Description\">\n                  <mat-header-cell *matHeaderCellDef class=\"text-md\"> DESCRIPTION </mat-header-cell>\n                  <mat-cell *matCellDef=\"let algo\"> {{algo.Description}} </mat-cell>\n                </ng-container>\n            \n                <!-- Status Column -->\n                <ng-container matColumnDef=\"Status\">\n                  <mat-header-cell *matHeaderCellDef class=\"text-md\"> STATUS </mat-header-cell>\n                  <mat-cell *matCellDef=\"let algo\"> {{algo.Status}} </mat-cell>\n                </ng-container>\n\n                <ng-container matColumnDef=\"Actions\">\n                    <mat-header-cell *matHeaderCellDef class=\"text-md\"> ACTIONS </mat-header-cell>\n                    <mat-cell *matCellDef=\"let algo\">\n                        <app-commands [algo]=\"algo\"></app-commands>\n                    </mat-cell>\n                </ng-container>\n            \n                <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n                <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n              </mat-table>\n            \n              <mat-paginator #paginator\n                             [pageSize]=\"10\"\n                             [pageSizeOptions]=\"[5, 10, 20]\">\n              </mat-paginator>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <button class=\"button button-blue\" (click)=\"createNewAlgo()\">Create new Algo</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/store/algo-list/algo-list.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/store/algo-list/algo-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlgoListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_service__ = __webpack_require__("../../../../../src/app/services/store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AlgoListComponent = (function () {
    function AlgoListComponent(storeService, eventService, router) {
        var _this = this;
        this.storeService = storeService;
        this.eventService = eventService;
        this.router = router;
        this.displayedColumns = ['Name', 'Description', 'Status', 'Actions'];
        this.dataSource = new __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatTableDataSource */]();
        this.showAlgoList = false;
        this.storeService.algoGetAll();
        this.storeService.algos.subscribe(function (result) {
            _this.dataSource.data = result;
            _this.showAlgoList = result.length > 0 ? true : false;
        });
    }
    AlgoListComponent.prototype.ngOnInit = function () {
        this.eventService.subscribeToEvent('algo:test:started', this.onAlgoStatusChanged.bind(this));
        this.eventService.subscribeToEvent('algo:test:stopped', this.onAlgoStatusChanged.bind(this));
        this.eventService.subscribeToEvent('algo:delete:done', this.onAlgoStatusChanged.bind(this));
    };
    AlgoListComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    AlgoListComponent.prototype.createNewAlgo = function () {
        this.storeService.activeAlgo = null;
        this.storeService.mode = 'create';
        this.storeService._algos.next([]);
        this.router.navigate(['store']);
    };
    AlgoListComponent.prototype.details = function (algo) {
        this.storeService.activeAlgo = algo;
        this.router.navigate(['store/algo-details']);
        return false;
    };
    AlgoListComponent.prototype.onAlgoStatusChanged = function () {
        this.storeService.algoGetAll();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatPaginator */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatPaginator */])
    ], AlgoListComponent.prototype, "paginator", void 0);
    AlgoListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-algo-list',
            template: __webpack_require__("../../../../../src/app/store/algo-list/algo-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/store/algo-list/algo-list.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_4__services_event_service__["a" /* EventService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]])
    ], AlgoListComponent);
    return AlgoListComponent;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: false,
    apiUrl: 'https://api-dev.lykkex.net/api',
    apiAuthUrl: 'https://auth-dev.lykkex.net',
    applicationId: '62b4815e-3762-4cf2-bad1-876a1feabeb7',
    redirectUrl: 'http://localhost:4200/',
    storeApiUrl: 'http://algo-store-api.lykke-algo-store.svc.cluster.local/api',
    authUrl: 'http://localhost:5000/api/home/authentication',
    tokenUrl: 'https://auth-dev.lykkex.net/getlykkewallettoken',
    idleTime: 300,
    idleTimeout: 60
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);


/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bm": "../../../../moment/locale/bm.js",
	"./bm.js": "../../../../moment/locale/bm.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es-us": "../../../../moment/locale/es-us.js",
	"./es-us.js": "../../../../moment/locale/es-us.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./gu": "../../../../moment/locale/gu.js",
	"./gu.js": "../../../../moment/locale/gu.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map