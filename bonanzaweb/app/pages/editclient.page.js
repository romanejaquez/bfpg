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
var client_model_1 = require('../models/client.model');
var utils_service_1 = require('../services/utils.service');
var EditClientPage = (function (_super) {
    __extends(EditClientPage, _super);
    function EditClientPage(router, proxy, navService, utils, params) {
        _super.call(this, router, proxy);
        this.navService = navService;
        this.utils = utils;
        this.Client = new client_model_1.ClientModel();
        this.SelectedClientId = "";
        this.SelectedClientId = params.getParam('id');
        this.Metadata = this.proxy.Metadata;
        this.PageTitle = "Editar Afiliado";
        if (this.Metadata) {
            this.Provincia = this.Metadata.provincias[0];
            this.Municipio = this.Provincia.municipios[0];
            this.SecProvincia = this.Metadata.provincias[0];
            this.SecMunicipio = this.Provincia.municipios[0];
        }
        else {
            this.proxy.handleError(null);
        }
    }
    EditClientPage.prototype.ngOnInit = function () {
        var _this = this;
        this.navService.onSelectNavItemByLink('/main/afiliados');
        this.proxy.getAfiliadoById(this.SelectedClientId).subscribe(function (payload) {
            var currentClient = payload;
            _this.Client = currentClient;
            _this.utils.formatClientDateString(_this.Client);
        });
    };
    EditClientPage.prototype.backToParent = function () {
        this.router.navigate(["/main/afiliados"]);
    };
    // for the primary affiliate
    EditClientPage.prototype.onChangeProvincia = function (provincia) {
        this.Provincia = this.Metadata.provincias[parseInt(provincia)];
        this.Municipio = this.Provincia.municipios[0];
        this.Client.afiliadoPrimario.direccion.provincia = this.Provincia.provincia;
        this.Client.afiliadoPrimario.direccion.municipio = this.Municipio.nombre;
        this.Client.afiliadoPrimario.direccion.distrito =
            this.Municipio.distritosMunicipales.length > 0 ? this.Municipio.distritosMunicipales[0] : "";
    };
    EditClientPage.prototype.onChangeMunicipio = function (municipio) {
        this.Municipio = this.Provincia.municipios[parseInt(municipio)];
        this.Client.afiliadoPrimario.direccion.municipio = this.Municipio.nombre;
        this.Client.afiliadoPrimario.direccion.distrito =
            this.Municipio.distritosMunicipales.length > 0 ? this.Municipio.distritosMunicipales[0] : "";
    };
    EditClientPage.prototype.onChangeDistritoMunicipal = function (distrito) {
        this.Client.afiliadoPrimario.direccion.distrito = this.Municipio.distritosMunicipales[distrito];
    };
    // for the secondary affiliate
    EditClientPage.prototype.onChangeSecProvincia = function (provincia) {
        this.SecProvincia = this.Metadata.provincias[parseInt(provincia)];
        this.SecMunicipio = this.SecProvincia.municipios[0];
        this.Client.afiliadoSecundario.direccion.provincia = this.SecProvincia.provincia;
        this.Client.afiliadoSecundario.direccion.municipio = this.SecMunicipio.nombre;
        this.Client.afiliadoSecundario.direccion.distrito =
            this.SecMunicipio.distritosMunicipales.length > 0 ? this.SecMunicipio.distritosMunicipales[0] : "";
    };
    EditClientPage.prototype.onChangeSecMunicipio = function (municipio) {
        this.SecMunicipio = this.SecProvincia.municipios[parseInt(municipio)];
        this.Client.afiliadoSecundario.direccion.municipio = this.SecMunicipio.nombre;
        this.Client.afiliadoSecundario.direccion.distrito =
            this.SecMunicipio.distritosMunicipales.length > 0 ? this.SecMunicipio.distritosMunicipales[0] : "";
    };
    EditClientPage.prototype.onChangeSecDistritoMunicipal = function (distrito) {
        this.Client.afiliadoSecundario.direccion.distrito = this.SecMunicipio.distritosMunicipales[distrito];
    };
    // submit
    EditClientPage.prototype.onCreateClient = function () {
        var _this = this;
        this.proxy.saveAfiliado(this.Client).subscribe(function (response) {
            if (response.success) {
                _this.router.navigate(['/main/afiliados']);
            }
        });
    };
    ;
    EditClientPage = __decorate([
        core_1.Component({
            selector: 'editclient-page',
            templateUrl: 'app/views/pages/newclient.html',
            providers: [utils_service_1.Utilities]
        }), 
        __metadata('design:paramtypes', [router_1.Router, serviceproxy_service_1.ServiceProxy, navigation_service_1.NavigationService, utils_service_1.Utilities, router_1.RouteSegment])
    ], EditClientPage);
    return EditClientPage;
}(base_page_1.BasePage));
exports.EditClientPage = EditClientPage;
//# sourceMappingURL=editclient.page.js.map