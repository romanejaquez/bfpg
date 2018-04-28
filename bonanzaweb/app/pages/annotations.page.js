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
var router_2 = require('@angular/router');
var addnote_dialog_1 = require('../dialogs/addnote.dialog');
var confirmation_dialog_1 = require('../dialogs/confirmation.dialog');
var dialogservice_service_1 = require('../services/dialogservice.service');
var utils_service_1 = require('../services/utils.service');
var AnnotationsPage = (function (_super) {
    __extends(AnnotationsPage, _super);
    function AnnotationsPage(router, proxy, dialogService, utils) {
        _super.call(this, router, proxy);
        this.dialogService = dialogService;
        this.utils = utils;
    }
    AnnotationsPage.prototype.ngOnInit = function () {
        this.retrieveAnotaciones();
    };
    AnnotationsPage.prototype.retrieveAnotaciones = function () {
        var _this = this;
        this.proxy.getAnotacionesFromUser().subscribe(function (payload) {
            _this.Anotaciones = payload;
        });
    };
    AnnotationsPage.prototype.addAnotationDialog = function () {
        var _this = this;
        this.router.navigate(['/main/anotaciones/nueva']);
        this.dialogService.showAddAnotacion('/main/anotaciones/nueva', '/main/anotaciones', function () {
            _this.retrieveAnotaciones();
        });
    };
    AnnotationsPage.prototype.convertDate = function (date) {
        return this.utils.getFullDateString(date);
    };
    AnnotationsPage.prototype.deleteAnotation = function (id) {
        var _this = this;
        this.dialogService.showMessage("Borrar Anotacion", "Esta seguro de querer borrar esta anotacion?", '/main/anotaciones/borrar', '/main/anotaciones', function () {
            _this.proxy.deleteAnotacionById(id).subscribe(function () {
                _this.retrieveAnotaciones();
            });
        });
    };
    // lifecycle hook events
    AnnotationsPage.prototype.ngAfterViewInit = function () {
        // Component views are initialized
        $("[data-toggle='tooltip']").tooltip();
    };
    __decorate([
        core_1.ViewChild(confirmation_dialog_1.ConfirmationDialog), 
        __metadata('design:type', confirmation_dialog_1.ConfirmationDialog)
    ], AnnotationsPage.prototype, "confirmationDialog", void 0);
    AnnotationsPage = __decorate([
        core_1.Component({
            selector: 'annotations-page',
            templateUrl: 'app/views/pages/annotations.html',
            directives: [confirmation_dialog_1.ConfirmationDialog, router_2.ROUTER_DIRECTIVES],
            providers: [utils_service_1.Utilities]
        }),
        router_2.Routes([
            {
                path: '/nueva',
                component: addnote_dialog_1.AddAnnotationDialog
            },
            {
                path: '/borrar',
                component: confirmation_dialog_1.ConfirmationDialog,
            }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, serviceproxy_service_1.ServiceProxy, dialogservice_service_1.DialogService, utils_service_1.Utilities])
    ], AnnotationsPage);
    return AnnotationsPage;
}(base_page_1.BasePage));
exports.AnnotationsPage = AnnotationsPage;
//# sourceMappingURL=annotations.page.js.map