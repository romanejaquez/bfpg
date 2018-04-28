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
var navitem_model_1 = require('../models/navitem.model');
var NavigationService = (function () {
    function NavigationService() {
        this.Navigation = { MainOptions: new Array(), AdditionalOptions: new Array() };
        // inicio
        this.Navigation.MainOptions.push(new navitem_model_1.NavigationItem("Inicio", "/main/", "home", 0, true, true));
        // clientes
        this.Navigation.MainOptions.push(new navitem_model_1.NavigationItem("Afiliados", "/main/afiliados", "group", 0, true, false));
        // pagos
        this.Navigation.MainOptions.push(new navitem_model_1.NavigationItem("Pagos", "/main/pagos", "dollar", 0, true, false));
        // anotaciones
        this.Navigation.MainOptions.push(new navitem_model_1.NavigationItem("Anotaciones", "/main/anotaciones", "document", 0, true, false));
        // opciones adicionales
        // notificaciones
        this.Navigation.AdditionalOptions.push(new navitem_model_1.NavigationItem("Notificaciones", "/main/notificaciones", "bell", 0, true, false));
        // reportes
        this.Navigation.AdditionalOptions.push(new navitem_model_1.NavigationItem("Reportes", "/main/reportes", "bar-chart", 0, true, false));
        // ajustes
        this.Navigation.AdditionalOptions.push(new navitem_model_1.NavigationItem("Ajustes", "/main/ajustes", "cog-gear", 0, true, false));
        // ayuda
        this.Navigation.AdditionalOptions.push(new navitem_model_1.NavigationItem("Ayuda", "/main/ayuda", "question-1", 0, true, false));
    }
    NavigationService.prototype.onSelectNavItem = function (selectedNavItem) {
        // loop through the options
        var allItems = this.Navigation.MainOptions.concat(this.Navigation.AdditionalOptions);
        allItems.forEach(function (navItem, index) {
            navItem.IsSelected = selectedNavItem != null && selectedNavItem.Label === navItem.Label;
        });
    };
    NavigationService.prototype.onSelectNavItemByLink = function (link) {
        var navItem = this.getNavItemByLink(link);
        this.onSelectNavItem(navItem);
    };
    NavigationService.prototype.getNavItemByLink = function (link) {
        var item = null;
        // loop through the options
        var allItems = this.Navigation.MainOptions.concat(this.Navigation.AdditionalOptions);
        for (var i = 0; i < allItems.length; i++) {
            if (allItems[i].Path === link) {
                item = allItems[i];
                break;
            }
        }
        return item;
    };
    NavigationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NavigationService);
    return NavigationService;
}());
exports.NavigationService = NavigationService;
//# sourceMappingURL=navigation.service.js.map