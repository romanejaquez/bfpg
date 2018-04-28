var mongoose = require('mongoose');

// payments schema
var pagoSchema = mongoose.Schema({
    transactionId: {
        type: String,
        required: true
    },
    afiliadoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tipoDeCuenta: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    fechaDePago: {
        type: Date,
        default: Date.now
    },
    fechaDeCiclo:{
        type: Date,
        default: Date.now
    },
    cantidadPaga: {
        type: Number
    },
    cantidadPorPagar: {
        type: Number
    },
    totalAPagar: {
        type: Number
    },
    frecuenciaDePago: {
        type: mongoose.Schema.Types.ObjectId   
    },
    nota: {
        type: String
    }
});

var Pago = module.exports = mongoose.model('Pago', pagoSchema);

// get payments
module.exports.getPagos = function(sort, limit, callback) {
      Pago.find(callback).sort(sort).limit(limit);
};

// get recent payments
module.exports.getPagosRecientes = function(sort, limit, callback) {
      Pago.find(callback).sort(sort).limit(limit);
};

// add payment
module.exports.addPago = function(pago, callback) {
      Pago.create(pago, callback);
};

// get a single payment
module.exports.getPagoById = function(id, callback) {
    Pago.findById(id, callback);
};

// get all payments from a given user
module.exports.getPagosFromUser = function(id, sort, limit, callback) {
    Pago.find({ afiliadoId: id }, callback).sort(sort).limit(limit);
};

// update payment
module.exports.updatePago = function(id, pago, options, callback) {
    var query = { _id: id };
    var updatedPayment = {
        cantidad: pago.cantidad
    };
    
    Pago.findOneAndUpdate(query, updatedPayment, options, callback);
}

// get all payments from a given date and forward
module.exports.getPagosUptoDate = function(date, callback) {
    Pago.aggregate([
            { $match: { fechaDePago: { $gte: date }}},
            { $group: { _id: 0,  total: { $sum: "$cantidadPaga" }}}
        ],
        callback);  
};

// get last payment from the user 
module.exports.getLastPagoFromUser = function(id, callback) {
    Pago.find({ afiliadoId: id }, callback).sort({ fechaDeCiclo: 'desc'}).limit(1);
};

// delete payment
module.exports.deletePago = function(id, callback) {
    var query = { _id: id };
    Pago.remove(query, callback);
}