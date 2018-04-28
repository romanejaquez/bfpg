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
/* controls */
var header_control_1 = require('../controls/header.control');
var sidenav_control_1 = require('../controls/sidenav.control');
var footer_control_1 = require('../controls/footer.control');
/* pages */
var home_page_1 = require('./home.page');
var payments_page_1 = require('./payments.page');
var profile_page_1 = require('./profile.page');
var settings_page_1 = require('./settings.page');
var clients_page_1 = require('./clients.page');
var notifications_page_1 = require('./notifications.page');
var annotations_page_1 = require('./annotations.page');
var reports_page_1 = require('./reports.page');
var help_page_1 = require('./help.page');
var ShellPage = (function () {
    function ShellPage(_router) {
        this._router = _router;
        //this._router.navigate['./main/inicio'];   
    }
    ShellPage = __decorate([
        core_1.Component({
            selector: 'shell-page',
            templateUrl: 'app/views/pages/shell.html',
            directives: [
                /* controls */
                header_control_1.HeaderControl,
                sidenav_control_1.SideNavControl,
                footer_control_1.FooterControl,
                /* pages from the menu */
                home_page_1.HomePage,
                clients_page_1.ClientsPage,
                payments_page_1.PaymentsPage,
                notifications_page_1.NotificationsPage,
                /* additional pages */
                annotations_page_1.AnnotationsPage,
                reports_page_1.ReportsPage,
                settings_page_1.SettingsPage,
                help_page_1.HelpPage,
                /* other pages */
                profile_page_1.ProfilePage,
                /* directives */
                router_1.ROUTER_DIRECTIVES
            ]
        }),
        router_1.Routes([
            {
                path: '/',
                component: home_page_1.HomePage
            },
            {
                path: '/afiliados',
                component: clients_page_1.ClientsPage
            },
            {
                path: '/pagos',
                component: payments_page_1.PaymentsPage
            },
            {
                path: '/notificaciones',
                component: notifications_page_1.NotificationsPage
            },
            {
                path: '/perfil',
                component: profile_page_1.ProfilePage
            },
            {
                path: '/anotaciones',
                component: annotations_page_1.AnnotationsPage
            },
            {
                path: '/reportes',
                component: reports_page_1.ReportsPage
            },
            {
                path: '/ajustes',
                component: settings_page_1.SettingsPage
            },
            {
                path: '/ayuda',
                component: help_page_1.HelpPage
            }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], ShellPage);
    return ShellPage;
}());
exports.ShellPage = ShellPage;
//# sourceMappingURL=shell.page.js.map