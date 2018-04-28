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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var navigation_service_1 = require('./navigation.service');
// models 
var user_model_1 = require('../models/user.model');
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
require('rxjs/add/operator/share');
require('rxjs/add/operator/catch');
var ServiceProxy = (function () {
    function ServiceProxy(http, navService, router) {
        this.http = http;
        this.navService = navService;
        this._router = null;
        this.Notifications = { ErrorMessage: '', RequestInProgress: false, RequestMessage: '', SuccessMessage: '' };
        this.LocalSettings = { RememberUser: false, Username: '' };
        this.baseUrl = 'http://localhost:5000/api/'; // 'http://45.55.133.28:5000/api/'; /
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        this.jwtToken = '';
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this.authHeaders = {};
        this.currentUserId = '';
        this._router = router;
        if (localStorage['username']) {
            this.LocalSettings.Username = localStorage['username'];
            this.LocalSettings.RememberUser = true;
        }
    }
    ServiceProxy.prototype.login = function (loginInfo) {
        var _this = this;
        this.Notifications.RequestInProgress = true;
        this.Notifications.ErrorMessage = '';
        this.http.post(this.baseUrl + 'login', JSON.stringify(loginInfo), this.options)
            .map(function (res) { return res.json(); })
            .subscribe(function (response) {
            if (response.success) {
                // persist the user for local storage (if needed)
                _this.rememberUsername();
                _this.jwtToken = response.token;
                _this.currentUserId = response.userId;
                _this.authHeaders = { headers: new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': response.token }) };
                _this._router.navigate(['/main/']);
            }
            else {
                _this.Notifications.ErrorMessage = response.message;
            }
            _this.Notifications.RequestInProgress = false;
        }, function (error) { return _this.handleError(error); });
    };
    ServiceProxy.prototype.getInitialPackage = function () {
        var _this = this;
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Obteniendo informacion...";
        return Observable_1.Observable.create(function (observer) {
            _this.http.get(_this.baseUrl + 'initialPackage?userid=' + _this.currentUserId, _this.authHeaders)
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
                _this.Notifications.RequestInProgress = false;
                if (response.success) {
                    _this.Metadata = response.payload.metadata;
                    _this.navService.User = new user_model_1.User(response.payload.usuario);
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    _this.Notifications.ErrorMessage = response.message;
                }
            }, function (error) { return _this.handleError(error); });
        });
    };
    ServiceProxy.prototype.getAfiliados = function () {
        var _this = this;
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Buscando Afiliados...";
        return Observable_1.Observable.create(function (observer) {
            _this.http.get(_this.baseUrl + 'afiliados', _this.authHeaders)
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
                _this.Notifications.RequestInProgress = false;
                if (response.success) {
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    _this.Notifications.ErrorMessage = response.message;
                }
            }, function (error) { return _this.handleError(error); });
        });
    };
    ServiceProxy.prototype.getAnotacionesFromUser = function () {
        var _this = this;
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Buscando Anotaciones...";
        return Observable_1.Observable.create(function (observer) {
            _this.http.get(_this.baseUrl + 'anotaciones?userid=' + _this.currentUserId, _this.authHeaders)
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
                _this.Notifications.RequestInProgress = false;
                if (response.success) {
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    _this.Notifications.ErrorMessage = response.message;
                }
            }, function (error) { return _this.handleError(error); });
        });
    };
    ServiceProxy.prototype.getAfiliadoByCedula = function (cedula) {
        var _this = this;
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Buscando Afiliado Por Cedula...";
        return Observable_1.Observable.create(function (observer) {
            _this.http.get(_this.baseUrl + 'afiliados?cedula=' + cedula, _this.authHeaders)
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
                _this.Notifications.RequestInProgress = false;
                if (response.success) {
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    _this.Notifications.ErrorMessage = response.message;
                }
            }, function (error) { return _this.handleError(error); });
        });
    };
    ServiceProxy.prototype.getAfiliadoById = function (id) {
        var _this = this;
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Buscando Afiliado...";
        return Observable_1.Observable.create(function (observer) {
            _this.http.get(_this.baseUrl + 'afiliados?id=' + id, _this.authHeaders)
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
                _this.Notifications.RequestInProgress = false;
                if (response.success) {
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    _this.Notifications.ErrorMessage = response.message;
                }
            }, function (error) { return _this.handleError(error); });
        });
    };
    ServiceProxy.prototype.getAfiliadoByIdPlusPayments = function (id) {
        var _this = this;
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Buscando Afiliado...";
        return Observable_1.Observable.create(function (observer) {
            _this.http.get(_this.baseUrl + 'pagos?afiliadoId=' + id, _this.authHeaders)
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
                _this.Notifications.RequestInProgress = false;
                if (response.success) {
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    _this.Notifications.ErrorMessage = response.message;
                }
            }, function (error) { return _this.handleError(error); });
        });
    };
    ServiceProxy.prototype.updateAfiliadoPagos = function (payments) {
        var _this = this;
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Añadiendo Pagos...";
        return Observable_1.Observable.create(function (observer) {
            _this.http.post(_this.baseUrl + 'pagos', JSON.stringify(payments), _this.authHeaders)
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
                if (response.success) {
                    observer.next({ success: true });
                }
                else {
                    observer.next({ success: false });
                    _this.Notifications.ErrorMessage = response.message;
                }
                observer.complete();
                _this.Notifications.RequestInProgress = false;
            }, function (error) { return _this.handleError(error); });
        });
    };
    ServiceProxy.prototype.getAfiliadosPorPagar = function () {
        var _this = this;
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Buscando Afiliados Por Pagar...";
        return Observable_1.Observable.create(function (observer) {
            _this.http.get(_this.baseUrl + 'pagos', _this.authHeaders)
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
                _this.Notifications.RequestInProgress = false;
                if (response.success) {
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    _this.Notifications.ErrorMessage = response.message;
                }
            }, function (error) { return _this.handleError(error); });
        });
    };
    // posts 
    ServiceProxy.prototype.addAnotacion = function (anotacion) {
        var _this = this;
        anotacion.createdBy = this.currentUserId;
        anotacion.created = new Date();
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Añadiendo Anotación...";
        return Observable_1.Observable.create(function (observer) {
            _this.http.post(_this.baseUrl + 'anotaciones', JSON.stringify(anotacion), _this.authHeaders)
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
                if (response.success) {
                    observer.next({ success: true });
                }
                else {
                    observer.next({ success: false });
                    _this.Notifications.ErrorMessage = response.message;
                }
                observer.complete();
                _this.Notifications.RequestInProgress = false;
            }, function (error) { return _this.handleError(error); });
        });
    };
    // post a new affiliate
    ServiceProxy.prototype.saveAfiliado = function (client) {
        var _this = this;
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Guardando Afiliado...";
        return Observable_1.Observable.create(function (observer) {
            _this.http.post(_this.baseUrl + 'afiliados', JSON.stringify(client), _this.authHeaders)
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
                if (response.success) {
                    observer.next({ success: true });
                }
                else {
                    observer.next({ success: false });
                    _this.Notifications.ErrorMessage = response.message;
                }
                observer.complete();
                _this.Notifications.RequestInProgress = false;
            }, function (error) { return _this.handleError(error); });
        });
    };
    ServiceProxy.prototype.addFamiliarToAfiliado = function (afiliadoId, familiar) {
        var _this = this;
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Guardando Familiar Beneficiado...";
        var familiarPackage = {
            afiliadoId: afiliadoId,
            familiar: familiar
        };
        return Observable_1.Observable.create(function (observer) {
            _this.http.post(_this.baseUrl + 'familiares', JSON.stringify(familiarPackage), _this.authHeaders)
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
                if (response.success) {
                    observer.next({ success: true });
                }
                else {
                    observer.next({ success: false });
                    _this.Notifications.ErrorMessage = response.message;
                }
                observer.complete();
                _this.Notifications.RequestInProgress = false;
            }, function (error) { return _this.handleError(error); });
        });
    };
    // deletes
    ServiceProxy.prototype.deleteAnotacionById = function (id) {
        var _this = this;
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Borrando Anotación...";
        return Observable_1.Observable.create(function (observer) {
            _this.http.delete(_this.baseUrl + 'anotaciones/' + id, _this.authHeaders)
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
                if (response.success) {
                    observer.next();
                    observer.complete();
                }
                else {
                    _this.Notifications.ErrorMessage = response.message;
                }
                _this.Notifications.RequestInProgress = false;
            }, function (error) { return _this.handleError(error); });
        });
    };
    ServiceProxy.prototype.rememberUsername = function () {
        if (this.LocalSettings.RememberUser) {
            localStorage["username"] = this.LocalSettings.Username;
        }
        else {
            localStorage.removeItem("username");
        }
    };
    ServiceProxy.prototype.handleError = function (error) {
        this.Notifications.RequestInProgress = false;
        if (error && error.status === 404) {
            this.Notifications.ErrorMessage = "Error contactando el servidor. Tratar de nuevo.";
            this._router.navigate(['/login']);
        }
        else if (error && error.status === 401) {
            this.Notifications.ErrorMessage = "Usuario no autorizado. Tratar de acceder de nuevo.";
            this._router.navigate(['/login']);
        }
        else {
            this.Notifications.ErrorMessage = "Hubo un problema en el sistema. Tratar de acceder de nuevo";
            this._router.navigate(['/login']);
        }
        this.navService.onSelectNavItemByLink('/main/');
    };
    ServiceProxy = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, navigation_service_1.NavigationService, router_1.Router])
    ], ServiceProxy);
    return ServiceProxy;
}());
exports.ServiceProxy = ServiceProxy;
//# sourceMappingURL=serviceproxy.service.js.map