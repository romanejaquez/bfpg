"use strict";
var DialogBase = (function () {
    function DialogBase(_router, Title, DialogName, ParentPath) {
        this._router = _router;
        this.Title = Title;
        this.DialogName = DialogName;
        this.ParentPath = ParentPath;
    }
    DialogBase.prototype.onHideDialog = function () {
        this._router.navigate([this.ParentPath]);
    };
    return DialogBase;
}());
exports.DialogBase = DialogBase;
//# sourceMappingURL=dialogbase.dialog.js.map