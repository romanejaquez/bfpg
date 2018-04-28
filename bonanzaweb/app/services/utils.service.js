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
var serviceproxy_service_1 = require('./serviceproxy.service');
var core_1 = require('@angular/core');
var Utilities = (function () {
    function Utilities(proxy) {
        this.proxy = proxy;
    }
    Utilities.prototype.convertDate = function (date) {
        return new Date(date);
    };
    Utilities.prototype.formatClientDateString = function (client) {
        var clientDOB = new Date(client.afiliadoPrimario.fechaDeNacimiento);
        var clientDOBFormat = clientDOB.getFullYear().toString() + '-' +
            ((clientDOB.getMonth() + 1) < 10 ? ("0" + (clientDOB.getMonth() + 1)) : (clientDOB.getMonth() + 1)).toString() + '-' +
            ((clientDOB.getDate() + 1) < 10 ? ("0" + (clientDOB.getDate() + 1)) : (clientDOB.getDate() + 1)).toString();
        client.afiliadoPrimario.fechaDeNacimiento = clientDOBFormat;
        clientDOB = new Date(client.afiliadoSecundario.fechaDeNacimiento);
        clientDOBFormat = clientDOB.getFullYear().toString() + '-' +
            ((clientDOB.getMonth() + 1) < 10 ? ("0" + (clientDOB.getMonth() + 1)) : (clientDOB.getMonth() + 1)).toString() + '-' +
            ((clientDOB.getDate() + 1) < 10 ? ("0" + (clientDOB.getDate() + 1)) : (clientDOB.getDate() + 1)).toString();
        client.afiliadoSecundario.fechaDeNacimiento = clientDOBFormat;
    };
    Utilities.prototype.getFullDateString = function (date) {
        var d = new Date(date);
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " a las " +
            (d.getHours() > 12 ? (d.getHours() - 12) : d.getHours()) + ":" + d.getMinutes() + " " + (d.getHours() > 12 ? "PM" : "AM");
    };
    Utilities.prototype.getAmountToPayFromAccountType = function (type) {
        var amount = 0;
        if (this.proxy.Metadata) {
            var accountType = this.proxy.Metadata.cuentas.filter(function (f) { return f._id == type; })[0];
            amount = accountType.cantidadAPagar;
        }
        return amount;
    };
    Utilities.prototype.getDateFromFrecuencia = function (frecuencia, lastPayment) {
        var date = new Date();
        var daysToApplyFrecuencia = 0;
        if (this.proxy.Metadata) {
            var frecuenciaObj = this.proxy.Metadata.frecuencias.filter(function (f) { return f._id == frecuencia; })[0];
            switch (frecuenciaObj.nombre) {
                case "Semanal":
                    daysToApplyFrecuencia = 7;
                    return this.adjustDate(lastPayment, daysToApplyFrecuencia);
                case "Quincenal":
                    daysToApplyFrecuencia = 14;
                    return this.adjustDate(lastPayment, daysToApplyFrecuencia);
                case "Mensual":
                    {
                        var d = lastPayment || new Date();
                        return new Date(d.getFullYear(), d.getMonth() + 2, 1);
                    }
            }
        }
    };
    Utilities.prototype.adjustDate = function (fechaDeCiclo, daysToApply) {
        var d = fechaDeCiclo || new Date();
        var dayOfMonth = d.getDate();
        switch (d.getDay()) {
            case 0:
                d.setDate(dayOfMonth - 6);
                break;
            case 1:
                if (fechaDeCiclo) {
                    d.setDate(dayOfMonth + daysToApply);
                }
                break;
            case 2:
                d.setDate(dayOfMonth - 1);
                break;
            case 3:
                d.setDate(dayOfMonth - 2);
                break;
            case 4:
                d.setDate(dayOfMonth - 3);
                break;
            case 5:
                d.setDate(dayOfMonth - 4);
                break;
            case 6:
                d.setDate(dayOfMonth - 5);
                break;
        }
        return d;
    };
    Utilities = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [serviceproxy_service_1.ServiceProxy])
    ], Utilities);
    return Utilities;
}());
exports.Utilities = Utilities;
//# sourceMappingURL=utils.service.js.map