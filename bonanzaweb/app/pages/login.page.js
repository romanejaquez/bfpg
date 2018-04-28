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
var logininfo_model_1 = require('../models/logininfo.model');
var base_page_1 = require('./base.page');
var router_1 = require('@angular/router');
var serviceproxy_service_1 = require('../services/serviceproxy.service');
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage(router, proxy) {
        _super.call(this, router, proxy);
        this.loginInfo = new logininfo_model_1.LoginInfo();
        this.LocalSettings = {};
        this.LocalSettings = this.proxy.LocalSettings;
        this.loginInfo.username = this.proxy.LocalSettings.Username;
    }
    LoginPage.prototype.onLogin = function () {
        this.proxy.login(this.loginInfo);
    };
    LoginPage.prototype.onRememberUser = function (remember) {
        if (remember) {
            this.proxy.LocalSettings.RememberUser = true;
            this.proxy.LocalSettings.Username = this.loginInfo.username;
        }
        else {
            this.proxy.LocalSettings.RememberUser = false;
            this.proxy.LocalSettings.Username = '';
        }
    };
    LoginPage = __decorate([
        core_1.Component({
            selector: 'login-page',
            templateUrl: 'app/views/pages/login.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, serviceproxy_service_1.ServiceProxy])
    ], LoginPage);
    return LoginPage;
}(base_page_1.BasePage));
exports.LoginPage = LoginPage;
//# sourceMappingURL=login.page.js.map