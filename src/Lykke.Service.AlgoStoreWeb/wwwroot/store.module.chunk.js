webpackJsonp(["store.module"],{

/***/ "../../../../../src/app/models/language.enum.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Language; });
var Language;
(function (Language) {
    Language[Language["NET"] = 0] = "NET";
    Language[Language["Java"] = 1] = "Java";
    Language[Language["Python"] = 2] = "Python";
})(Language || (Language = {}));


/***/ }),

/***/ "../../../../../src/app/store/store-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_component__ = __webpack_require__("../../../../../src/app/store/store.component.ts");


var routes = [
    { path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__store_component__["a" /* StoreComponent */]
    }
];
var StoreRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forChild(routes);


/***/ }),

/***/ "../../../../../src/app/store/store.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container store-placeholder\">\n  <div class=\"row\">\n    <div class=\"col-xs-12\">\n      <div class=\"stepper\">\n        <mat-horizontal-stepper [linear]=\"true\" #stepper>\n\n          <mat-step>\n            <div class=\"step-one-language\">\n              <ng-template matStepLabel>language</ng-template>\n\n              <h1 class=\"heading-sm text-center mt-40 mb-60\">Choose Langage for the Algo:</h1>\n              <div class=\"row\">\n                <div class=\"col-md-4 text-center\">\n                  <div class=\"language-button net disabled\" (click)=\"setLanguage(Language.NET)\">\n                    <img src=\"assets/img/store/Microsoft.Net_logo.svg\" alt=\"\">\n                    <p class=\"text-center\">.NET</p>\n                  </div>\n                </div>\n                <div class=\"col-md-4 text-center\">\n\n                  <div class=\"language-button java active\" (click)=\"setLanguage(Language.Java)\">\n                    <img src=\"assets/img/store/java_logo.svg\" alt=\"\">\n                    <p class=\"text-center\">Java</p>\n                  </div>\n\n                </div>\n                <div class=\"col-md-4 text-center\">\n                  <div class=\"language-button python disabled\" (click)=\"setLanguage(Language.Python)\">\n                    <img src=\"assets/img/store/python_logo.svg\" alt=\"\">\n                    <p class=\"text-center\">Python</p>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </mat-step>\n\n          <mat-step>\n            <div class=\"step-two-setup\">\n              <ng-template matStepLabel>setup</ng-template>\n              <div class=\"row\">\n                  <h1 class=\"heading-sm text-center mt-40 mb-60\">Set up your custom algorithm</h1>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-md-1\"></div>\n                <div class=\"col-md-10\">\n                  <p class=\"plain text-lgb text-left\">\n                    Java maven Algo Archetype. In order to generate an algo you may use the Lykke Algo java archetype\n                  </p>\n                  \n                    <pre class=\"code pt-25\">\nmvn org.apache.maven.plugins:maven-archetype-plugin:2.4:generate \\\n-DarchetypeGroupId=com.lykke.algos \\\n-DarchetypeArtifactId=algos-archetype \\\n-DarchetypeVersion=1.0-SNAPSHOT \\\n-DgroupId=com.algo \\\n-DartifactId=myalgo \\\n-Dversion=1.0-SNAPSHOT \\\n-DarchetypeCatalog=https://oss.sonatype.org/content/repositories/snapshots\n                    </pre>\n\n                    <p class=\"plain text-lgb text-left\">\n                        This will create a java maven project for you with groupId com.algo, artifact id myalgo in directory myalgo in your current folder. \n                        Please go inside and review the contentns.\n                    </p>\n                    <pre class=\"code pt-20 pb-20\">cd myalgo</pre>\n\n                    <p class=\"plain text-lgb text-left\">\n                        In order to make your algo to work please create a file called hft-client.properties with the following \n                        content in myalgo/src/main/resources\n                    </p>\n                    <pre class=\"code pt-25\">\nHFT_API_BASE_PATH=&lt;LYKKE HFT API trading endpoint, e.g https://hft-service-dev.lykkex.net&gt;\nHFT_KEY=&lt;YOUR HFT API client key&gt;\nWALLET_KEY=&lt;YOUR WALLET KEY&gt;\nASSET_PAIR=&lt;THE ASSET PAIR YOU WANT TO TRADE, e.g BTCUSD&gt;\nASSET=&lt;THE ASSET YOU WANT TO BUY AND SELL, e.g BTC&gt;\nVOLUME=&lt;THE VOLUME YOU WANT TO BUY, e.g 0.001&gt;\nMARGIN=&lt;THE MARGINE WITH WHICH YOU WANT TO SELL, e.g 1.1&gt;\n                    </pre>\n\n                    <p class=\"plain text-lgb text-left\">\n                        Once you are ready with that you may package your algo\n                    </p>\n                    <pre class=\"code pt-20 pb-20\">mvn clean package</pre>\n\n                    <p class=\"plain text-lgb text-left\">\n                        This will generate an executable jar with dependencies file in your target folder.\n                    </p>\n                    <pre class=\"code pt-20 pb-20\">target/myalgo-1.0-SNAPSHOT-jar-with-dependencies.jar</pre>\n\n                    <p class=\"plain text-lgb text-left\">\n                        In order to verify it you may execute:\n                    </p>\n                    <pre class=\"code pt-20 pb-20\">java -jar myalgo/target/myalgo-1.0-SNAPSHOT-jar-with-dependencies.jar</pre>\n\n                    <p class=\"plain text-lgb text-left\">\n                        If you see an output like\n                    </p>\n                    <pre class=\"code pt-25\">\n——————Check wallet!!!——————\n——————Buy some coins on the market price!——————\n——————Selling XXX coins with some profit on YYY price!!!——————                      \n                    </pre>\n                  \n                    <p class=\"plain text-lgb text-left\">\n                        Then your algo is working and you are ready to deploy it in AlgoStore. For the purpose upload your jar-with-dependencies.jar file there.\n                    </p>\n                </div>\n                <div class=\"col-md-1\"></div>\n              </div>\n              <div class=\"text-center\">\n                <button class=\"button button-blue\" mat-button matStepperNext>Next</button>\n              </div>\n            </div>\n          </mat-step>\n\n          <mat-step [stepControl]=\"updateFormGroup\">\n            <h1 class=\"heading-sm text-center mt-40 mb-60\">Upload Java file with your Algo</h1>\n            <form [formGroup]=\"updateFormGroup\">\n              <ng-template matStepLabel>upload</ng-template>\n              <div class=\"col-md-3\"></div>\n              <div class=\"col-md-6 text-center\">\n\n                <div class=\"mt-30 mb-90 step-two-setup-upload\" *ngIf=\"showUploadSection\">\n\n                  <img src=\"assets/img/store/upload_icon.svg\" alt=\"\" (click)=\"initiateUpload()\" width=\"64\" class=\"mb-60\">\n                  <input type=\"file\" #fileInput placeholder=\"Upload file...\" accept=\".jar\" style=\"display: none;\" (change)=\"uploaded()\"\n                  />\n\n                  <div>\n                    <button class=\"button button-blue\" mat-button matStepperNext (click)=\"initiateUpload()\">Browse</button>\n                  </div>\n                </div>\n\n                <div class=\"step-two-setup-metadata\" *ngIf=\"!showUploadSection\">\n                  <p class=\"file-uploaded\">\n                    <img src=\"assets/img/store/file_icon.svg\" alt=\"\" width=\"17\" height=\"22\" class=\"pull-left mr-10\">\n                    <span class=\"pull-left\">{{(file && file.name) ? file.name:'Upload jar file with Algo'}}</span>\n                    <span class=\"pull-right\">100%</span>\n                  </p>\n                  <p class=\"error\"></p>\n                  <h3 class=\"mt-60\">Add algo details:</h3>\n                  <mat-form-field>\n                    <input matInput placeholder=\"Algo name\" formControlName=\"name\" required>\n                  </mat-form-field>\n                  <br>\n                  <mat-form-field>\n                    <textarea matInput placeholder=\"Description\" matTextareaAutosize matAutosizeMinRows=\"2\" matAutosizeMaxRows=\"5\" formControlName=\"description\"></textarea>\n                  </mat-form-field>\n                  <div>\n                    <button class=\"button button-blue\" mat-button matStepperNext (click)=\"update()\" [disabled]=\"isAlgoDetailsButtonDisabled()\">Next</button>\n                  </div>\n                </div>\n\n              </div>\n              <div class=\"col-md-3\"></div>\n            </form>\n          </mat-step>\n\n          <mat-step>\n            <ng-template matStepLabel>deploy</ng-template>\n            <div class=\"step-four-deploy text-center mt-100\">\n              \n              <div *ngIf=\"showProgress\">\n                <img src=\"assets/img/store/Rolling.svg\" alt=\"\">\n              </div>\n\n              <div *ngIf=\"!showProgress && !hasDeploymentErrors\" class=\"mt-100\">\n                <h3>Your Algo is being deployed</h3>\n                <div class=\"mt-100\">\n                  <button class=\"button button-blue\" mat-button matStepperPrevious (click)=\"showListOfAlgos()\">Finish</button>\n                </div>\n              </div>\n\n              <div *ngIf=\"hasDeploymentErrors\" class=\"mt-100\">\n                <h3>There is a problem with your algo</h3>\n                <div class=\"mt-100\">\n                  <button class=\"button button-blue\" mat-button matStepperPrevious>Back</button>\n                </div>\n              </div>\n\n            </div>\n          </mat-step>\n\n        </mat-horizontal-stepper>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/store/store.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/store/store.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_store_service__ = __webpack_require__("../../../../../src/app/services/store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_language_enum__ = __webpack_require__("../../../../../src/app/models/language.enum.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_event_service__ = __webpack_require__("../../../../../src/app/services/event.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var StoreComponent = (function () {
    function StoreComponent(storeService, eventService, router, formBuilder) {
        this.storeService = storeService;
        this.eventService = eventService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.isLinear = false;
        this.showProgress = true;
        this.Language = __WEBPACK_IMPORTED_MODULE_5__models_language_enum__["a" /* Language */];
    }
    StoreComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.secondFormGroup = this.formBuilder.group({
            secondCtrl: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* Validators */].required]
        });
        this.updateFormGroup = this.formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* Validators */].required],
            description: ['']
        });
        this.storeService.algoGetAll();
        this.storeService.algos.subscribe(function (result) {
            _this.algos = result;
            console.log('this.storeService.activeAlgo: ' + _this.storeService.activeAlgo);
            console.log("this.storeService.mode: " + _this.storeService.mode);
            console.log('this.algos.length: ' + _this.algos.length);
            if (_this.storeService.mode != 'create' && _this.algos.length > 0) {
                _this.router.navigate(["store/algo-list"]);
            }
            else {
                //this.storeService.mode = null;
                _this.showUploadSection = !_this.hasFile;
            }
        });
        this.eventService.subscribeToEvent('algo:deployment:done', this.onAlgoDeployed.bind(this));
        this.eventService.subscribeToEvent('algo:deployment:error', this.onAlgoDeploymentError.bind(this));
    };
    StoreComponent.prototype.onAlgoDeployed = function () {
        this.showProgress = false;
        this.stepper.next();
    };
    StoreComponent.prototype.onAlgoDeploymentError = function (message) {
        this.showProgress = false;
        this.hasDeploymentErrors = true;
    };
    StoreComponent.prototype.setLanguage = function (language) {
        switch (language) {
            case __WEBPACK_IMPORTED_MODULE_5__models_language_enum__["a" /* Language */].NET:
                console.log('NET');
                break;
            case __WEBPACK_IMPORTED_MODULE_5__models_language_enum__["a" /* Language */].Python:
                console.log('Python');
                break;
            default:
                console.log('Java');
                break;
        }
        this.stepper.next();
    };
    // Set state for 'Next' button on 'update' tab
    StoreComponent.prototype.isAlgoDetailsButtonDisabled = function () {
        if (!this.hasFile && !this.updateFormGroup.valid) {
            return true;
        }
    };
    StoreComponent.prototype.initiateUpload = function (e) {
        var fileInput = document.querySelector('input[type="file"]');
        fileInput.click();
    };
    // fileUpload 'change' method
    StoreComponent.prototype.uploaded = function () {
        this.hasFile = true;
        this.file = this.fileInput.nativeElement.files[0];
        this.showUploadSection = false;
    };
    // Button 'Next' on 'update' tab click method
    StoreComponent.prototype.update = function () {
        this.showUploadSection = false;
        this.stepper.selectedIndex = 2;
        if (this.updateFormGroup.controls.name.value) {
            var algo = {
                Name: this.updateFormGroup.controls.name.value,
                Description: this.updateFormGroup.controls.description.value
            };
            this.storeService.algoCreateDetails(algo, this.file);
            this.stepper.next();
        }
        return false;
    };
    StoreComponent.prototype.algoCreateDetails = function (algo) {
        this.storeService.algoCreateDetails(algo);
    };
    StoreComponent.prototype.showListOfAlgos = function () {
        this.router.navigate(["store/algo-list"]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fileInput'),
        __metadata("design:type", Object)
    ], StoreComponent.prototype, "fileInput", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('stepper'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__angular_material__["e" /* MatStepper */])
    ], StoreComponent.prototype, "stepper", void 0);
    StoreComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-store',
            template: __webpack_require__("../../../../../src/app/store/store.component.html"),
            styles: [__webpack_require__("../../../../../src/app/store/store.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_6__services_event_service__["a" /* EventService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */]])
    ], StoreComponent);
    return StoreComponent;
}());



/***/ }),

/***/ "../../../../../src/app/store/store.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreModule", function() { return StoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_routing_module__ = __webpack_require__("../../../../../src/app/store/store-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_cdk_stepper__ = __webpack_require__("../../../cdk/esm5/stepper.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material_stepper__ = __webpack_require__("../../../material/esm5/stepper.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material_form_field__ = __webpack_require__("../../../material/esm5/form-field.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__store_component__ = __webpack_require__("../../../../../src/app/store/store.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// ROUTING






// COMPONENTS

// SERVICES
var StoreModule = (function () {
    function StoreModule() {
    }
    StoreModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__store_routing_module__["a" /* StoreRouting */],
                __WEBPACK_IMPORTED_MODULE_3__angular_cdk_stepper__["d" /* CdkStepperModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material_stepper__["b" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["k" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material_form_field__["c" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__store_component__["a" /* StoreComponent */]
            ],
            providers: []
        })
    ], StoreModule);
    return StoreModule;
}());



/***/ })

});
//# sourceMappingURL=store.module.chunk.js.map