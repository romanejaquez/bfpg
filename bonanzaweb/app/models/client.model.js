"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var accounttype_model_1 = require('./accounttype.model');
var duepayment_model_1 = require('./duepayment.model');
var ClientModel = (function () {
    function ClientModel() {
        this.creado = new Date();
        this.ultimoAcceso = new Date();
        this.afiliadoPrimario = new AfiliadoPrimarioModel();
        this.afiliadoSecundario = new AfiliadoSecundarioModel();
        this.cuenta = new accounttype_model_1.AccountTypeModel();
        this.familiaresBeneficiados = new Array();
        this.actividadDePago = new duepayment_model_1.AccountPaymentActivityModel();
        this.notas = new Array();
    }
    return ClientModel;
}());
exports.ClientModel = ClientModel;
var AfiliadoBaseModel = (function () {
    function AfiliadoBaseModel() {
        this.direccion = new AfiliadoDireccionModel();
        this.telefono = new AfiliadoTelefonoModel();
    }
    return AfiliadoBaseModel;
}());
exports.AfiliadoBaseModel = AfiliadoBaseModel;
var AfiliadoPrimarioModel = (function (_super) {
    __extends(AfiliadoPrimarioModel, _super);
    function AfiliadoPrimarioModel() {
        _super.call(this);
    }
    return AfiliadoPrimarioModel;
}(AfiliadoBaseModel));
exports.AfiliadoPrimarioModel = AfiliadoPrimarioModel;
var AfiliadoSecundarioModel = (function (_super) {
    __extends(AfiliadoSecundarioModel, _super);
    function AfiliadoSecundarioModel() {
        _super.call(this);
    }
    return AfiliadoSecundarioModel;
}(AfiliadoBaseModel));
exports.AfiliadoSecundarioModel = AfiliadoSecundarioModel;
var FamiliarBeneficiadoModel = (function (_super) {
    __extends(FamiliarBeneficiadoModel, _super);
    function FamiliarBeneficiadoModel() {
        _super.call(this);
    }
    return FamiliarBeneficiadoModel;
}(AfiliadoBaseModel));
exports.FamiliarBeneficiadoModel = FamiliarBeneficiadoModel;
var AfiliadoDireccionModel = (function () {
    function AfiliadoDireccionModel() {
    }
    return AfiliadoDireccionModel;
}());
exports.AfiliadoDireccionModel = AfiliadoDireccionModel;
var AfiliadoTelefonoModel = (function () {
    function AfiliadoTelefonoModel() {
    }
    return AfiliadoTelefonoModel;
}());
exports.AfiliadoTelefonoModel = AfiliadoTelefonoModel;
//# sourceMappingURL=client.model.js.map