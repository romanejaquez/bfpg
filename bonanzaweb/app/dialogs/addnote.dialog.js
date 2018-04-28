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
var dialogbase_dialog_1 = require('./dialogbase.dialog');
var router_1 = require('@angular/router');
var annotation_model_1 = require('../models/annotation.model');
var serviceproxy_service_1 = require('../services/serviceproxy.service');
var dialogservice_service_1 = require('../services/dialogservice.service');
var AddAnnotationDialog = (function (_super) {
    __extends(AddAnnotationDialog, _super);
    function AddAnnotationDialog(_router, proxy, dialogService) {
        _super.call(this, _router, "Anadir Nueva Anotacion", "addAnnotationModal", "/main/anotaciones");
        this.proxy = proxy;
        this.dialogService = dialogService;
        this.Annotation = new annotation_model_1.AnnotationModel();
        this.MaxChars = 200;
    }
    // lifecycle hook events
    AddAnnotationDialog.prototype.ngAfterViewInit = function () {
        $('#' + this.DialogName).draggable({ handle: '.modal-header' });
    };
    AddAnnotationDialog.prototype.onAddAnnotation = function () {
        var _this = this;
        this.proxy.addAnotacion(this.Annotation).subscribe(function (payload) {
            _this.onHideDialog();
            if (payload.success) {
                _this.dialogService.Callback();
            }
        });
    };
    AddAnnotationDialog = __decorate([
        core_1.Component({
            selector: 'addannotation-dialog',
            templateUrl: 'app/views/dialogs/addannotation.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, serviceproxy_service_1.ServiceProxy, dialogservice_service_1.DialogService])
    ], AddAnnotationDialog);
    return AddAnnotationDialog;
}(dialogbase_dialog_1.DialogBase));
exports.AddAnnotationDialog = AddAnnotationDialog;
//# sourceMappingURL=addnote.dialog.js.map