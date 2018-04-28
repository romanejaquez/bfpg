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
var clientdetails_page_1 = require('./clientdetails.page');
var clientlist_page_1 = require('./clientlist.page');
var newclient_page_1 = require('./newclient.page');
var newrelative_page_1 = require('./newrelative.page');
var editclient_page_1 = require('./editclient.page');
var ClientsPage = (function () {
    function ClientsPage() {
    }
    ClientsPage = __decorate([
        core_1.Component({
            selector: 'clients-page',
            templateUrl: 'app/views/pages/clients.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.Routes([
            {
                path: '/familiares/nuevo/:id',
                component: newrelative_page_1.NewRelativePage
            },
            {
                path: '/nuevo',
                component: newclient_page_1.NewClientPage
            },
            {
                path: 'editar/:id',
                component: editclient_page_1.EditClientPage
            },
            {
                path: '/:id',
                component: clientdetails_page_1.ClientDetailsPage
            },
            {
                path: '/',
                component: clientlist_page_1.ClientListPage
            }
        ]), 
        __metadata('design:paramtypes', [])
    ], ClientsPage);
    return ClientsPage;
}());
exports.ClientsPage = ClientsPage;
//# sourceMappingURL=clients.page.js.map