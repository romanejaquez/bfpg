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
var SideNavControl = (function () {
    function SideNavControl(_router, navService) {
        this._router = _router;
        this.navService = navService;
    }
    SideNavControl.prototype.onSideNavClick = function (selectedNavItem) {
        this.navService.onSelectNavItem(selectedNavItem);
        this._router.navigate([selectedNavItem.Path]);
    };
    // lifecycle hook events
    SideNavControl.prototype.ngAfterViewInit = function () {
        // Component views are initialized
        $(".sideNavWrapper [data-toggle='tooltip']").tooltip();
    };
    SideNavControl = __decorate([
        core_1.Component({
            selector: 'sidenav-control',
            templateUrl: 'app/views/controls/sidenav.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, navigation_service_1.NavigationService])
    ], SideNavControl);
    return SideNavControl;
}());
exports.SideNavControl = SideNavControl;
//# sourceMappingURL=sidenav.control.js.map