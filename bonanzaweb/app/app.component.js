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
/* pages */
var shell_page_1 = require('./pages/shell.page');
var login_page_1 = require('./pages/login.page');
var AppComponent = (function () {
    function AppComponent(_router) {
        this._router = _router;
        this._router.navigate(['/login']);
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'bonanza-app',
            templateUrl: 'app/views/bonanza.html',
            directives: [
                /* pages */
                shell_page_1.ShellPage,
                login_page_1.LoginPage,
                /* directives */
                router_1.ROUTER_DIRECTIVES
            ]
        }),
        router_1.Routes([
            {
                path: '/login',
                component: login_page_1.LoginPage
            },
            {
                path: '/main',
                component: shell_page_1.ShellPage
            }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map