var mongoose = require('mongoose');

// genre schema
var cuentaSchema = mongoose.Schema({
    nombre: {
        type: String
    } ,
    cantidadAPagar: {
        type: Number
    }
});

var Cuenta = module.exports = mongoose.model('Cuenta', cuentaSchema);

// get all account types
module.exports.getCuentas = function(callback, limit) {
      Cuenta.find({}, callback).limit(limit);
};

// get a single account type
module.exports.getCuentaById = function(id, callback) {
    Cuenta.findById(id, callback);
};

// update account type
module.exports.updateCuenta = function(id, cuenta, options, callback) {
    var query = { _id: id };
    var updatedCuenta = {
        nombre: cuenta.nombre
    };
    
    Cuenta.findOneAndUpdate(cuenta, updatedCuenta, options, callback);
};