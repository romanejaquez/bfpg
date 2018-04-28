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
var router_1 = require('@angular/router');
var base_page_1 = require('./base.page');
var serviceproxy_service_1 = require('../services/serviceproxy.service');
var navigation_service_1 = require('../services/navigation.service');
var metadata_pipe_1 = require('../pipes/metadata.pipe');
var PaymentsListPage = (function (_super) {
    __extends(PaymentsListPage, _super);
    function PaymentsListPage(router, navService, proxy) {
        _super.call(this, router, proxy);
        this.navService = navService;
    }
    PaymentsListPage.prototype.ngOnInit = function () {
        var _this = this;
        this.navService.onSelectNavItemByLink('/main/pagos');
        this.proxy.getAfiliadosPorPagar().subscribe(function (payload) {
            _this.PaymentsPackage = payload;
        });
    };
    PaymentsListPage.prototype.onMakePayment = function (id) {
        this.router.navigate(['/main/pagos', id]);
    };
    PaymentsListPage.prototype.onViewAfiliado = function (id) {
        this.router.navigate(['/main/afiliados', id]);
    };
    // lifecycle hook events
    PaymentsListPage.prototype.ngAfterViewInit = function () {
        // Component views are initialized
        $("[data-toggle='tooltip']").tooltip();
    };
    PaymentsListPage = __decorate([
        core_1.Component({
            selector: 'paymentslist-page',
            templateUrl: 'app/views/pages/paymentslist.html',
            pipes: [metadata_pipe_1.MetadataPipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, navigation_service_1.NavigationService, serviceproxy_service_1.ServiceProxy])
    ], PaymentsListPage);
    return PaymentsListPage;
}(base_page_1.BasePage));
exports.PaymentsListPage = PaymentsListPage;
//# sourceMappingURL=paymentslist.page.js.map