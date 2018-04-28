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
var navigation_service_1 = require('../services/navigation.service');
var metadata_pipe_1 = require('../pipes/metadata.pipe');
var payment_model_1 = require('../models/payment.model');
var duepayment_model_1 = require('../models/duepayment.model');
var utils_service_1 = require('../services/utils.service');
var MakePaymentPage = (function (_super) {
    __extends(MakePaymentPage, _super);
    function MakePaymentPage(router, proxy, navService, utils, params) {
        _super.call(this, router, proxy);
        this.navService = navService;
        this.utils = utils;
        this.HistorialDePago = new Array();
        this.PaymentSelection = { SelectAmountToPay: true, OtherAmountToPay: false, AdvancedPay: false };
        this.Payments = new payment_model_1.PaymentsCollectionModel();
        this.AccountPaymentActivity = new duepayment_model_1.AccountPaymentActivityModel();
        this.TotalPaymentAmount = 0;
        this.AbonoPayment = null;
        this.SelectedClientId = params.getParam('id');
    }
    MakePaymentPage.prototype.onSelectPaymentType = function (type) {
        $("input[type=checkbox]").removeAttr("checked");
        this.TotalPaymentAmount = 0;
        this.Payments.pagos = new Array();
        this.AccountPaymentActivity.pagosPorHacer = new Array();
        switch (type) {
            case 0:
                {
                    this.PaymentSelection.SelectAmountToPay = true;
                    this.PaymentSelection.OtherAmountToPay = false;
                    this.PaymentSelection.AdvancedPay = false;
                }
                break;
            case 1:
                {
                    this.PaymentSelection.SelectAmountToPay = false;
                    this.PaymentSelection.OtherAmountToPay = true;
                    this.PaymentSelection.AdvancedPay = false;
                }
                break;
            case 2:
                {
                    this.PaymentSelection.SelectAmountToPay = false;
                    this.PaymentSelection.OtherAmountToPay = false;
                    this.PaymentSelection.AdvancedPay = true;
                }
                break;
        }
    };
    MakePaymentPage.prototype.onSelectPayment = function (selectedOption) {
        // selected payment
    };
    MakePaymentPage.prototype.backToParent = function () {
        this.router.navigate(["/main/pagos"]);
    };
    MakePaymentPage.prototype.ngOnInit = function () {
        var _this = this;
        this.navService.onSelectNavItemByLink('/main/pagos');
        this.proxy.getAfiliadoByIdPlusPayments(this.SelectedClientId).subscribe(function (payload) {
            var currentClient = payload.afiliado;
            _this.Client = currentClient;
            _this.HistorialDePago = payload.historialDePago;
            _this.AbonoPayment = _this.Client.actividadDePago.pagosPorHacer.length > 0 ?
                _this.Client.actividadDePago.pagosPorHacer[0] : null;
            _this.PaymentSelection.SelectAmountToPay = _this.Client.actividadDePago.pagosPorHacer.length > 0;
            _this.PaymentSelection.AdvancedPay = _this.Client.actividadDePago.pagosPorHacer.length == 0;
            if (_this.PaymentSelection.AdvancedPay) {
                $("#paymentAheadRadio").attr("checked", "checked");
            }
        });
    };
    MakePaymentPage.prototype.addAdvancedPayment = function () {
        var singlePayment = new payment_model_1.SinglePaymentModel();
        singlePayment.afiliadoId = this.Client._id;
        singlePayment.tipoDeCuenta = this.Client.cuenta.tipo;
        singlePayment.cantidadPaga = this.utils.getAmountToPayFromAccountType(this.Client.cuenta.tipo);
        singlePayment.totalAPagar = singlePayment.cantidadPaga;
        singlePayment.fechaDePago = new Date();
        singlePayment.fechaDeCiclo = this.utils.getDateFromFrecuencia(this.Client.cuenta.frecuenciaDePago, (this.Payments.pagos.length > 0 ? this.Payments.pagos[this.Payments.pagos.length - 1].fechaDeCiclo :
            (this.HistorialDePago.length > 0 ? new Date(this.HistorialDePago[0].fechaDeCiclo) : null)));
        singlePayment.frecuenciaDePago = this.Client.cuenta.frecuenciaDePago;
        this.Payments.pagos.push(singlePayment);
        this.processTotalPayment();
    };
    MakePaymentPage.prototype.enableMakePaymentBtn = function () {
        return (this.PaymentSelection.SelectAmountToPay && !this.TotalPaymentAmount) ||
            (this.PaymentSelection.OtherAmountToPay && this.AbonoPayment && (!this.TotalPaymentAmount || this.TotalPaymentAmount > this.AbonoPayment.cantidadPorPagar));
    };
    MakePaymentPage.prototype.convertDate = function (date) {
        return this.utils.convertDate(date);
    };
    MakePaymentPage.prototype.onPaymentRowChecked = function (checked, payment) {
        if (checked) {
            this.TotalPaymentAmount += payment.totalAPagar;
        }
        else {
            this.TotalPaymentAmount -= payment.totalAPagar;
        }
    };
    MakePaymentPage.prototype.processTotalPayment = function () {
        var _this = this;
        this.TotalPaymentAmount = 0;
        this.Payments.pagos.forEach(function (p, index) {
            _this.TotalPaymentAmount += p.cantidadPaga;
        });
    };
    MakePaymentPage.prototype.onViewHistorialDePago = function () {
    };
    MakePaymentPage.prototype.submitPayment = function () {
        var _this = this;
        var paymentType;
        if (this.PaymentSelection.SelectAmountToPay) {
            paymentType = "paymentSelection";
        }
        else if (this.PaymentSelection.OtherAmountToPay) {
            paymentType = "abonoPayment";
            var abonoPayment = new payment_model_1.SinglePaymentModel();
            abonoPayment.cantidadPaga = this.AbonoPayment.cantidadPaga + this.TotalPaymentAmount;
            abonoPayment.cantidadPorPagar = this.AbonoPayment.cantidadPorPagar - this.TotalPaymentAmount;
            abonoPayment.fechaDeCiclo = this.AbonoPayment.fechaDeCiclo;
            abonoPayment.fechaDePago = new Date();
            abonoPayment.nota = this.AbonoPayment.nota;
            abonoPayment.totalAPagar = this.AbonoPayment.totalAPagar;
            abonoPayment.transactionId = this.AbonoPayment.transactionId;
            abonoPayment.tipoDeCuenta = this.Client.cuenta.tipo;
            abonoPayment.frecuenciaDePago = this.Client.cuenta.frecuenciaDePago;
            abonoPayment.afiliadoId = this.Client._id;
            this.Payments.pagos.push(abonoPayment);
        }
        else {
            paymentType = "advancedPayment";
        }
        var payload = {
            paymentType: paymentType,
            pagos: this.Payments.pagos
        };
        this.proxy.updateAfiliadoPagos(payload).subscribe(function (payload) {
            if (payload.success) {
                // redirect back to the user details
                _this.router.navigate(["main/afiliados/", _this.SelectedClientId]);
            }
        });
    };
    MakePaymentPage = __decorate([
        core_1.Component({
            selector: 'paymentslist-page',
            templateUrl: 'app/views/pages/makepayment.html',
            pipes: [metadata_pipe_1.MetadataPipe],
            providers: [utils_service_1.Utilities]
        }), 
        __metadata('design:paramtypes', [router_1.Router, serviceproxy_service_1.ServiceProxy, navigation_service_1.NavigationService, utils_service_1.Utilities, router_1.RouteSegment])
    ], MakePaymentPage);
    return MakePaymentPage;
}(base_page_1.BasePage));
exports.MakePaymentPage = MakePaymentPage;
//# sourceMappingURL=makepayment.page.js.map