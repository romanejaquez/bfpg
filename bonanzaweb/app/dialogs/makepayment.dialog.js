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
var MakePaymentDialog = (function (_super) {
    __extends(MakePaymentDialog, _super);
    function MakePaymentDialog(_router) {
        _super.call(this, _router, "Hacer Pago", "makePaymentModal", '/main/pagos');
        this.PaymentSelection = { SelectAmountToPay: false, OtherAmountToPay: false };
    }
    MakePaymentDialog.prototype.onSelectPayment = function (selectedOption) {
    };
    // lifecycle hook events
    MakePaymentDialog.prototype.ngAfterViewInit = function () {
        $('#' + this.DialogName).draggable({ handle: '.modal-header' });
    };
    MakePaymentDialog = __decorate([
        core_1.Component({
            selector: 'makepayment-dialog',
            templateUrl: 'app/views/dialogs/makepayment.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], MakePaymentDialog);
    return MakePaymentDialog;
}(dialogbase_dialog_1.DialogBase));
exports.MakePaymentDialog = MakePaymentDialog;
//# sourceMappingURL=makepayment.dialog.js.map