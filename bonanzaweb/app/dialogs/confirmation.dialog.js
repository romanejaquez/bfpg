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
var dialogservice_service_1 = require('../services/dialogservice.service');
var ConfirmationDialog = (function (_super) {
    __extends(ConfirmationDialog, _super);
    function ConfirmationDialog(_router, _dialogService) {
        _super.call(this, _router, "Confirmar", "confirmationModal", _dialogService.ParentRoute);
        this._dialogService = _dialogService;
        this.Title = _dialogService.Title;
        this.Message = _dialogService.Message;
    }
    ConfirmationDialog.prototype.onAceptarClick = function () {
        // execute the provided callback
        this._dialogService.Callback();
        // then dismiss the dialog
        this.onHideDialog();
    };
    // lifecycle hook events
    ConfirmationDialog.prototype.ngAfterViewInit = function () {
        $('#' + this.DialogName).draggable({ handle: '.modal-header' });
    };
    ConfirmationDialog = __decorate([
        core_1.Component({
            selector: 'confirmation-dialog',
            templateUrl: 'app/views/dialogs/confirmation.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, dialogservice_service_1.DialogService])
    ], ConfirmationDialog);
    return ConfirmationDialog;
}(dialogbase_dialog_1.DialogBase));
exports.ConfirmationDialog = ConfirmationDialog;
//# sourceMappingURL=confirmation.dialog.js.map