"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
var core_1 = require('@angular/core');
var dialogbase_component_1 = require('./dialogbase.component');
var AnotherComponent = (function (_super) {
    __extends(AnotherComponent, _super);
    function AnotherComponent() {
        _super.apply(this, arguments);
    }
    AnotherComponent = __decorate([
        core_1.Component({
            selector: 'another',
            template: "another component here!!!<br/>"
        }), 
        __metadata('design:paramtypes', [])
    ], AnotherComponent);
    return AnotherComponent;
}(dialogbase_component_1.DialogBase));
exports.AnotherComponent = AnotherComponent;
//# sourceMappingURL=another.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
/* controls */
var header_control_1 = require('./controls/header.control');
var sidenav_control_1 = require('./controls/sidenav.control');
var footer_control_1 = require('./controls/footer.control');
/* pages */
var home_page_1 = require('./pages/home.page');
var payments_page_1 = require('./pages/payments.page');
var AppComponent = (function () {
    function AppComponent(_router) {
        this._router = _router;
        this._router.navigate(['/inicio']);
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'bonanza-app',
            templateUrl: 'app/views/bonanza.html',
            directives: [
                header_control_1.HeaderControl, sidenav_control_1.SideNavControl, footer_control_1.FooterControl, home_page_1.HomePage, payments_page_1.PaymentsPage, router_1.ROUTER_DIRECTIVES
            ]
        }),
        router_1.Routes([
            {
                path: '/inicio',
                component: home_page_1.HomePage
            },
            {
                path: '/pagos',
                component: payments_page_1.PaymentsPage
            }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
"use strict";
/* tslint:disable:no-unused-variable */
var app_component_1 = require('./app.component');
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var platform_browser_1 = require('@angular/platform-browser');
////////  SPECS  /////////////
/// Delete this
testing_1.describe('Smoke test', function () {
    testing_1.it('should run a passing test', function () {
        testing_1.expect(true).toEqual(true, 'should pass');
    });
});
testing_1.describe('AppComponent with new', function () {
    testing_1.it('should instantiate component', function () {
        testing_1.expect(new app_component_1.AppComponent()).toBeDefined('Whoopie!');
    });
});
testing_1.describe('AppComponent with TCB', function () {
    testing_1.it('should instantiate component', testing_1.async(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        tcb.createAsync(app_component_1.AppComponent).then(function (fixture) {
            testing_1.expect(fixture.componentInstance instanceof app_component_1.AppComponent).toBe(true, 'should create AppComponent');
        });
    })));
    testing_1.it('should have expected <h1> text', testing_1.async(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        tcb.createAsync(app_component_1.AppComponent).then(function (fixture) {
            // fixture.detectChanges();  // would need to resolve a binding but we don't have a binding
            var h1 = fixture.debugElement.query(function (el) { return el.name === 'h1'; }).nativeElement; // it works
            h1 = fixture.debugElement.query(platform_browser_1.By.css('h1')).nativeElement; // preferred
            testing_1.expect(h1.innerText).toMatch(/angular 2 app/i, '<h1> should say something about "Angular 2 App"');
        });
    })));
});
//# sourceMappingURL=app.component.spec.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var DialogService = (function () {
    function DialogService(dcl, injector) {
        this.dcl = dcl;
        this.injector = injector;
    }
    DialogService.prototype.showDialog = function (dialogName) {
        $('#' + dialogName).show();
        $('#' + dialogName + " .modal").draggable({ handle: '.modal-header' });
    };
    DialogService.prototype.hideDialog = function (dialogName) {
        $('#' + dialogName).hide();
    };
    DialogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.Injector])
    ], DialogService);
    return DialogService;
}());
exports.DialogService = DialogService;
//# sourceMappingURL=dialog.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var something_service_1 = require('./something.service');
var core_1 = require('@angular/core');
var dialog_service_1 = require('./dialog.service');
var DialogBase = (function () {
    function DialogBase(_dialogService) {
        this._dialogService = _dialogService;
        this.Title = '';
        this.Message = '';
        this.DialogName = '';
    }
    DialogBase.prototype.onHideDialog = function () {
        this._dialogService.hideDialog(this.DialogName);
    };
    DialogBase.prototype.onShowDialog = function () {
        this._dialogService.showDialog(this.DialogName);
    };
    DialogBase = __decorate([
        core_1.Component({
            providers: [something_service_1.SomethingService]
        }), 
        __metadata('design:paramtypes', [dialog_service_1.DialogService])
    ], DialogBase);
    return DialogBase;
}());
exports.DialogBase = DialogBase;
//# sourceMappingURL=dialogbase.component.js.map
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var dialog_service_1 = require('./dialog.service');
var splashscreen_component_1 = require('./splashscreen.component');
var router_1 = require('@angular/router');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [router_1.ROUTER_PROVIDERS, dialog_service_1.DialogService]);
platform_browser_dynamic_1.bootstrap(splashscreen_component_1.SplashScreenComponent);
//# sourceMappingURL=main.js.map
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
var core_1 = require('@angular/core');
var dialogbase_component_1 = require('./dialogbase.component');
var something_service_1 = require('./something.service');
var SimpleComponent = (function (_super) {
    __extends(SimpleComponent, _super);
    function SimpleComponent(_dialogService) {
        _super.call(this, _dialogService);
        this._dialogService = _dialogService;
    }
    SimpleComponent.prototype.onAlert = function () {
        alert('hello'); //alert(this._dService.onGetData()[0].name);
    };
    SimpleComponent.prototype.onHide = function () {
        this.onHideDialog();
    };
    SimpleComponent = __decorate([
        core_1.Component({
            selector: 'simple',
            templateUrl: 'app/views/simple.html',
            providers: [something_service_1.SomethingService]
        }), 
        __metadata('design:paramtypes', [something_service_1.SomethingService])
    ], SimpleComponent);
    return SimpleComponent;
}(dialogbase_component_1.DialogBase));
exports.SimpleComponent = SimpleComponent;
//# sourceMappingURL=simple.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var SomethingService = (function () {
    function SomethingService() {
    }
    SomethingService.prototype.onGetData = function () {
        return [
            { name: "Roman" }
        ];
    };
    SomethingService.prototype.onRemoveDialog = function () {
        $("#modalDialog").remove();
    };
    SomethingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SomethingService);
    return SomethingService;
}());
exports.SomethingService = SomethingService;
//# sourceMappingURL=something.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var SplashScreenComponent = (function () {
    function SplashScreenComponent() {
        var _this = this;
        setTimeout(function () {
            _this.onDoneLoadingResources();
        }, 2000);
    }
    SplashScreenComponent.prototype.onDoneLoadingResources = function () {
        $(".splashScreen").remove();
    };
    SplashScreenComponent = __decorate([
        core_1.Component({
            selector: 'splash-screen',
            templateUrl: 'app/views/splash.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SplashScreenComponent);
    return SplashScreenComponent;
}());
exports.SplashScreenComponent = SplashScreenComponent;
//# sourceMappingURL=splashscreen.component.js.map
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
var core_1 = require('@angular/core');
var dialog_service_1 = require('./dialog.service');
var dialogbase_component_1 = require('./dialogbase.component');
var YetAnotherComponent = (function (_super) {
    __extends(YetAnotherComponent, _super);
    function YetAnotherComponent(_dialogService) {
        _super.call(this, _dialogService);
        this.SomeValue = 'Dime a ver';
        this.AnotherValue = "... and some stuff here too!";
        this.DialogName = "YetAnotherModalDialog";
        this.Title = "I'm yet!";
    }
    YetAnotherComponent = __decorate([
        core_1.Component({
            selector: 'yet',
            templateUrl: 'app/views/yet.html'
        }), 
        __metadata('design:paramtypes', [dialog_service_1.DialogService])
    ], YetAnotherComponent);
    return YetAnotherComponent;
}(dialogbase_component_1.DialogBase));
exports.YetAnotherComponent = YetAnotherComponent;
//# sourceMappingURL=yetanother.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var FooterControl = (function () {
    function FooterControl() {
    }
    FooterControl = __decorate([
        core_1.Component({
            selector: 'footer-control',
            templateUrl: 'app/views/controls/footer.html'
        }), 
        __metadata('design:paramtypes', [])
    ], FooterControl);
    return FooterControl;
}());
exports.FooterControl = FooterControl;
//# sourceMappingURL=footer.control.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var HeaderControl = (function () {
    function HeaderControl() {
    }
    HeaderControl = __decorate([
        core_1.Component({
            selector: 'header-control',
            templateUrl: 'app/views/controls/header.html'
        }), 
        __metadata('design:paramtypes', [])
    ], HeaderControl);
    return HeaderControl;
}());
exports.HeaderControl = HeaderControl;
//# sourceMappingURL=header.control.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var SampleControl = (function () {
    function SampleControl() {
        var x = 0;
    }
    SampleControl = __decorate([
        core_1.Component({
            selector: 'sample-control',
            templateUrl: 'app/views/controls/sample.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SampleControl);
    return SampleControl;
}());
exports.SampleControl = SampleControl;
//# sourceMappingURL=sample.control.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var SideNavControl = (function () {
    function SideNavControl(_router) {
        this._router = _router;
    }
    SideNavControl.prototype.onSideNavClick = function (path) {
        this._router.navigate([path]);
    };
    SideNavControl = __decorate([
        core_1.Component({
            selector: 'sidenav-control',
            templateUrl: 'app/views/controls/sidenav.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], SideNavControl);
    return SideNavControl;
}());
exports.SideNavControl = SideNavControl;
//# sourceMappingURL=sidenav.control.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var sample_control_1 = require('../controls/sample.control');
var another_component_1 = require('../another.component');
var HomePage = (function () {
    function HomePage(_router) {
        this._router = _router;
        this._router.navigate['/inicio/sample'];
    }
    HomePage = __decorate([
        core_1.Component({
            selector: 'home-page',
            templateUrl: 'app/views/pages/home.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.Routes([
            {
                path: '/sample',
                component: sample_control_1.SampleControl
            },
            {
                path: '/another',
                component: another_component_1.AnotherComponent
            }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
//# sourceMappingURL=home.page.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var PaymentsPage = (function () {
    function PaymentsPage() {
    }
    PaymentsPage = __decorate([
        core_1.Component({
            selector: 'payments-page',
            templateUrl: 'app/views/pages/payments.html'
        }), 
        __metadata('design:paramtypes', [])
    ], PaymentsPage);
    return PaymentsPage;
}());
exports.PaymentsPage = PaymentsPage;
//# sourceMappingURL=payments.page.js.map