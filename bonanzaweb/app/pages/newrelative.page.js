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
var client_model_1 = require('../models/client.model');
var utils_service_1 = require('../services/utils.service');
var NewRelativePage = (function (_super) {
    __extends(NewRelativePage, _super);
    function NewRelativePage(router, proxy, utils, params) {
        _super.call(this, router, proxy);
        this.utils = utils;
        this.Familiar = new client_model_1.FamiliarBeneficiadoModel();
        this.SelectedClientId = params.getParam('id');
        this.Metadata = this.proxy.Metadata;
        if (this.Metadata) {
            this.Provincia = this.Metadata.provincias[0];
            this.Municipio = this.Provincia.municipios[0];
        }
        else {
            this.proxy.handleError(null);
        }
    }
    NewRelativePage.prototype.ngOnInit = function () {
        var _this = this;
        this.proxy.getAfiliadoById(this.SelectedClientId).subscribe(function (payload) {
            var currentClient = payload[0];
            _this.Client = currentClient;
        });
    };
    NewRelativePage.prototype.backToParent = function () {
        this.router.navigate(["/main/afiliados/", this.SelectedClientId]);
    };
    // for the associated relative
    NewRelativePage.prototype.onChangeProvincia = function (provincia) {
        this.Provincia = this.Metadata.provincias.filter(function (p) { return p.provincia === provincia; })[0];
        this.Municipio = this.Provincia.municipios[0];
        this.Familiar.direccion.provincia = this.Provincia.provincia;
        this.Familiar.direccion.municipio = this.Municipio.nombre;
        this.Familiar.direccion.distrito =
            this.Municipio.distritosMunicipales.length > 0 ? this.Municipio.distritosMunicipales[0] : "";
    };
    NewRelativePage.prototype.onChangeMunicipio = function (municipio) {
        this.Municipio = this.Provincia.municipios.filter(function (m) { return m.nombre === municipio; })[0];
        this.Familiar.direccion.municipio = this.Municipio.nombre;
        this.Familiar.direccion.distrito =
            this.Municipio.distritosMunicipales.length > 0 ? this.Municipio.distritosMunicipales[0] : "";
    };
    NewRelativePage.prototype.onChangeDistritoMunicipal = function (distrito) {
        this.Familiar.direccion.distrito = distrito;
    };
    NewRelativePage.prototype.onCreateRelative = function () {
        var _this = this;
        this.proxy.addFamiliarToAfiliado(this.SelectedClientId, this.Familiar).subscribe(function (response) {
            if (response.success) {
                _this.router.navigate(['/main/afiliados', _this.SelectedClientId]);
            }
        });
    };
    NewRelativePage.prototype.onSameAddressToggle = function () {
        var _this = this;
        this.Familiar.direccionIgualAlAfiliado = !this.Familiar.direccionIgualAlAfiliado;
        if (this.Familiar.direccionIgualAlAfiliado) {
            this.Provincia = this.Metadata.provincias.filter(function (p) { return p.provincia === _this.Client.afiliadoPrimario.direccion.provincia; })[0];
            this.Municipio = this.Provincia.municipios.filter(function (m) { return m.nombre === _this.Client.afiliadoPrimario.direccion.municipio; })[0];
            this.Familiar.direccion.calle = this.Client.afiliadoPrimario.direccion.calle;
            this.Familiar.direccion.provincia = this.Client.afiliadoPrimario.direccion.provincia;
            this.Familiar.direccion.municipio = this.Client.afiliadoPrimario.direccion.municipio;
            this.Familiar.direccion.distrito = this.Client.afiliadoPrimario.direccion.distrito;
            this.Familiar.direccion.referenciaLugar = this.Client.afiliadoPrimario.direccion.referenciaLugar;
        }
        else {
            this.Familiar.direccion = new client_model_1.AfiliadoDireccionModel();
        }
    };
    NewRelativePage = __decorate([
        core_1.Component({
            selector: 'newrelative-page',
            templateUrl: 'app/views/pages/newrelative.html',
            providers: [utils_service_1.Utilities]
        }), 
        __metadata('design:paramtypes', [router_1.Router, serviceproxy_service_1.ServiceProxy, utils_service_1.Utilities, router_1.RouteSegment])
    ], NewRelativePage);
    return NewRelativePage;
}(base_page_1.BasePage));
exports.NewRelativePage = NewRelativePage;
//# sourceMappingURL=newrelative.page.js.map