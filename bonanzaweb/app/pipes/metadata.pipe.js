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
var serviceproxy_service_1 = require('../services/serviceproxy.service');
var MetadataPipe = (function () {
    function MetadataPipe(proxy) {
        this.proxy = proxy;
    }
    MetadataPipe.prototype.transform = function (value, exponent) {
        switch (exponent) {
            case 'tipo':
                return this.getAccountTypeById(value);
            case 'frecuencia':
                return this.getFrecuenciaById(value);
            case 'parentesco':
                return this.getParentescoById(value);
        }
    };
    MetadataPipe.prototype.getAccountTypeById = function (id) {
        var cuenta = null;
        if (this.proxy.Metadata) {
            var allCuentas = this.proxy.Metadata.cuentas;
            for (var i = 0; i < allCuentas.length; i++) {
                var currentCuenta = allCuentas[i];
                if (currentCuenta._id === id) {
                    cuenta = currentCuenta;
                    break;
                }
            }
        }
        return cuenta ? cuenta.nombre : '';
    };
    MetadataPipe.prototype.getFrecuenciaById = function (id) {
        var frecuencia = null;
        if (this.proxy.Metadata) {
            var allFrecuencias = this.proxy.Metadata.frecuencias;
            for (var i = 0; i < allFrecuencias.length; i++) {
                var currentFrecuencia = allFrecuencias[i];
                if (currentFrecuencia._id === id) {
                    frecuencia = currentFrecuencia;
                    break;
                }
            }
        }
        return frecuencia ? frecuencia.nombre : '';
    };
    MetadataPipe.prototype.getParentescoById = function (id) {
        var parentesco = null;
        if (this.proxy.Metadata) {
            var allParentescos = this.proxy.Metadata.parentescos;
            for (var i = 0; i < allParentescos.length; i++) {
                var currentParentesco = allParentescos[i];
                if (currentParentesco._id === id) {
                    parentesco = currentParentesco;
                    break;
                }
            }
        }
        return parentesco ? parentesco.nombre : '';
    };
    MetadataPipe = __decorate([
        core_1.Pipe({ name: 'metadata' }), 
        __metadata('design:paramtypes', [serviceproxy_service_1.ServiceProxy])
    ], MetadataPipe);
    return MetadataPipe;
}());
exports.MetadataPipe = MetadataPipe;
//# sourceMappingURL=metadata.pipe.js.map