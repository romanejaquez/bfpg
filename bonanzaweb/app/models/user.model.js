"use strict";
var User = (function () {
    function User(usuario) {
        this.id = usuario.id;
        this.email = usuario.email;
        this.name = usuario.name;
        this.username = usuario.username;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map