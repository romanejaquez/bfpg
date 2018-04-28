"use strict";
var SinglePaymentModel = (function () {
    function SinglePaymentModel() {
        this.fechaDePago = new Date();
        this.fechaDeCiclo = new Date();
        this.creadoPor = "";
        this.transactionId = "";
    }
    return SinglePaymentModel;
}());
exports.SinglePaymentModel = SinglePaymentModel;
var PaymentsCollectionModel = (function () {
    function PaymentsCollectionModel() {
        this.pagos = new Array();
    }
    return PaymentsCollectionModel;
}());
exports.PaymentsCollectionModel = PaymentsCollectionModel;
//# sourceMappingURL=payment.model.js.map