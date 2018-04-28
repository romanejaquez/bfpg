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
var NewClientPage = (function (_super) {
    __extends(NewClientPage, _super);
    function NewClientPage(router, proxy) {
        _super.call(this, router, proxy);
        this.Client = new client_model_1.ClientModel();
        this.PageTitle = "Nuevo Afiliado";
        this.Metadata = this.proxy.Metadata;
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
    NewClientPage.prototype.backToParent = function () {
        this.router.navigate(["/main/afiliados"]);
    };
    // for the primary affiliate
    NewClientPage.prototype.onChangeProvincia = function (provincia) {
        this.Provincia = this.Metadata.provincias[parseInt(provincia)];
        this.Municipio = this.Provincia.municipios[0];
        this.Client.afiliadoPrimario.direccion.provincia = this.Provincia.provincia;
        this.Client.afiliadoPrimario.direccion.municipio = this.Municipio.nombre;
        this.Client.afiliadoPrimario.direccion.distrito =
            this.Municipio.distritosMunicipales.length > 0 ? this.Municipio.distritosMunicipales[0] : "";
    };
    NewClientPage.prototype.onChangeMunicipio = function (municipio) {
        this.Municipio = this.Provincia.municipios[parseInt(municipio)];
        this.Client.afiliadoPrimario.direccion.municipio = this.Municipio.nombre;
        this.Client.afiliadoPrimario.direccion.distrito =
            this.Municipio.distritosMunicipales.length > 0 ? this.Municipio.distritosMunicipales[0] : "";
    };
    NewClientPage.prototype.onChangeDistritoMunicipal = function (distrito) {
        this.Client.afiliadoPrimario.direccion.distrito = this.Municipio.distritosMunicipales[distrito];
    };
    // for the secondary affiliate
    NewClientPage.prototype.onChangeSecProvincia = function (provincia) {
        this.SecProvincia = this.Metadata.provincias[parseInt(provincia)];
        this.SecMunicipio = this.SecProvincia.municipios[0];
        this.Client.afiliadoSecundario.direccion.provincia = this.SecProvincia.provincia;
        this.Client.afiliadoSecundario.direccion.municipio = this.SecMunicipio.nombre;
        this.Client.afiliadoSecundario.direccion.distrito =
            this.SecMunicipio.distritosMunicipales.length > 0 ? this.SecMunicipio.distritosMunicipales[0] : "";
    };
    NewClientPage.prototype.onChangeSecMunicipio = function (municipio) {
        this.SecMunicipio = this.SecProvincia.municipios[parseInt(municipio)];
        this.Client.afiliadoSecundario.direccion.municipio = this.SecMunicipio.nombre;
        this.Client.afiliadoSecundario.direccion.distrito =
            this.SecMunicipio.distritosMunicipales.length > 0 ? this.SecMunicipio.distritosMunicipales[0] : "";
    };
    NewClientPage.prototype.onChangeSecDistritoMunicipal = function (distrito) {
        this.Client.afiliadoSecundario.direccion.distrito = this.SecMunicipio.distritosMunicipales[distrito];
    };
    // submit
    NewClientPage.prototype.onCreateClient = function () {
        var _this = this;
        this.proxy.saveAfiliado(this.Client).subscribe(function (response) {
            if (response.success) {
                _this.router.navigate(['/main/afiliados']);
            }
        });
    };
    ;
    NewClientPage = __decorate([
        core_1.Component({
            selector: 'newclient-page',
            templateUrl: 'app/views/pages/newclient.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, serviceproxy_service_1.ServiceProxy])
    ], NewClientPage);
    return NewClientPage;
}(base_page_1.BasePage));
exports.NewClientPage = NewClientPage;
//# sourceMappingURL=newclient.page.js.map