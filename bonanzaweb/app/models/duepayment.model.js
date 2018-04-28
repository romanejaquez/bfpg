"use strict";
var DuePaymentModel = (function () {
    function DuePaymentModel() {
        this.fechaDeCiclo = new Date();
        this.fechaDePago = new Date();
    }
    return DuePaymentModel;
}());
exports.DuePaymentModel = DuePaymentModel;
var AccountPaymentActivityModel = (function () {
    function AccountPaymentActivityModel() {
        this.pagosPorHacer = new Array();
    }
    return AccountPaymentActivityModel;
}());
exports.AccountPaymentActivityModel = AccountPaymentActivityModel;
//# sourceMappingURL=duepayment.model.js.map