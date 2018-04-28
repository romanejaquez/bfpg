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
var router_1 = require('@angular/router');
var navigation_service_1 = require('../services/navigation.service');
var HeaderControl = (function () {
    function HeaderControl(router, navService) {
        this.router = router;
        this.navService = navService;
    }
    HeaderControl.prototype.onMenuNavigate = function (link) {
        var navItem = this.navService.getNavItemByLink(link);
        this.navService.onSelectNavItem(navItem);
        // for now, let's do it this way
        if (link === '/login') {
            var mainNavItem = this.navService.getNavItemByLink('/main/');
            this.navService.onSelectNavItem(mainNavItem);
        }
        this.router.navigate([link]);
    };
    HeaderControl = __decorate([
        core_1.Component({
            selector: 'header-control',
            templateUrl: 'app/views/controls/header.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, navigation_service_1.NavigationService])
    ], HeaderControl);
    return HeaderControl;
}());
exports.HeaderControl = HeaderControl;
//# sourceMappingURL=header.control.js.map