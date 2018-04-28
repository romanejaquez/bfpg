"use strict";
var DialogBase = (function () {
    function DialogBase(_dialogService) {
        this._dialogService = _dialogService;
        this.Title = '';
        this.Message = '';
        this.DialogName = '';
    }
    DialogBase.prototype.onHideDialog = function () {
        this._dialogService.hideDialog(this.DialogName);
    };
    DialogBase.prototype.onShowDialog = function () {
        this._dialogService.showDialog(this.DialogName);
    };
    return DialogBase;
}());
exports.DialogBase = DialogBase;
//# sourceMappingURL=dialogbase.component.js.map