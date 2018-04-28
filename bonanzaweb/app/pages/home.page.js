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
var base_page_1 = require('./base.page');
var router_1 = require('@angular/router');
var serviceproxy_service_1 = require('../services/serviceproxy.service');
var metadata_pipe_1 = require('../pipes/metadata.pipe');
var HomePage = (function (_super) {
    __extends(HomePage, _super);
    function HomePage(router, proxy) {
        _super.call(this, router, proxy);
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.proxy.getInitialPackage().subscribe(function (payload) {
            _this.InitialPackage = payload;
        });
    };
    HomePage.prototype.onMakePayment = function (afiliadoId) {
        this.router.navigate(['/main/pagos', afiliadoId]);
    };
    HomePage.prototype.onViewAfiliado = function (afiliadoId) {
        this.router.navigate(['/main/afiliados', afiliadoId]);
    };
    // lifecycle hook events
    HomePage.prototype.ngAfterViewInit = function () {
        // Component views are initialized
        $("[data-toggle='tooltip']").tooltip();
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'home-page',
            templateUrl: 'app/views/pages/home.html',
            pipes: [metadata_pipe_1.MetadataPipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, serviceproxy_service_1.ServiceProxy])
    ], HomePage);
    return HomePage;
}(base_page_1.BasePage));
exports.HomePage = HomePage;
//# sourceMappingURL=home.page.js.map