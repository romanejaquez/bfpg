"use strict";
var BasePage = (function () {
    function BasePage(_router, _proxy) {
        this.proxy = null;
        this.router = null;
        this.PageTitle = "";
        this.proxy = _proxy;
        this.router = _router;
        this.Notifications = this.proxy.Notifications;
    }
    return BasePage;
}());
exports.BasePage = BasePage;
//# sourceMappingURL=base.page.js.map