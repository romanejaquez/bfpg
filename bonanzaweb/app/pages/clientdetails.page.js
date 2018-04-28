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
var addclient_dialog_1 = require('../dialogs/addclient.dialog');
var router_1 = require('@angular/router');
var base_page_1 = require('./base.page');
var serviceproxy_service_1 = require('../services/serviceproxy.service');
var navigation_service_1 = require('../services/navigation.service');
var clientdetailsexpander_control_1 = require('../controls/clientdetailsexpander.control');
var metadata_pipe_1 = require('../pipes/metadata.pipe');
var utils_service_1 = require('../services/utils.service');
var ClientDetailsPage = (function (_super) {
    __extends(ClientDetailsPage, _super);
    function ClientDetailsPage(router, proxy, utils, navService, params) {
        _super.call(this, router, proxy);
        this.utils = utils;
        this.navService = navService;
        this.SelectedClientId = params.getParam('id');
    }
    ClientDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.navService.onSelectNavItemByLink('/main/afiliados');
        this.proxy.getAfiliadoById(this.SelectedClientId).subscribe(function (payload) {
            var currentClient = payload;
            _this.Client = currentClient;
        });
    };
    ClientDetailsPage.prototype.backToParent = function () {
        this.router.navigate(["/main/afiliados"]);
    };
    ClientDetailsPage.prototype.editAfiliado = function () {
        this.router.navigate(["/main/afiliados/editar", this.SelectedClientId]);
    };
    ClientDetailsPage.prototype.convertDate = function (date) {
        return this.utils.convertDate(date);
    };
    ClientDetailsPage.prototype.onMakePayment = function (id) {
        this.router.navigate(['/main/pagos', this.SelectedClientId]);
    };
    ClientDetailsPage.prototype.onAddRelative = function () {
        this.router.navigate(['/main/afiliados/familiares/nuevo', this.SelectedClientId]);
    };
    ClientDetailsPage = __decorate([
        core_1.Component({
            selector: 'clientdetails-page',
            templateUrl: 'app/views/pages/clientdetails.html',
            directives: [addclient_dialog_1.AddClientDialog, clientdetailsexpander_control_1.ClientDetailsExpanderControl, router_1.ROUTER_DIRECTIVES],
            pipes: [metadata_pipe_1.MetadataPipe],
            providers: [utils_service_1.Utilities]
        }), 
        __metadata('design:paramtypes', [router_1.Router, serviceproxy_service_1.ServiceProxy, utils_service_1.Utilities, navigation_service_1.NavigationService, router_1.RouteSegment])
    ], ClientDetailsPage);
    return ClientDetailsPage;
}(base_page_1.BasePage));
exports.ClientDetailsPage = ClientDetailsPage;
//# sourceMappingURL=clientdetails.page.js.map