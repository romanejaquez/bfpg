var mongoose = require('mongoose');

// frequency schema
var frecuenciaSquema = mongoose.Schema({
    nombre: {
        type: String
    }
});

var Frecuencia = module.exports = mongoose.model('Frecuencia', frecuenciaSquema);

// get all payment frequencies
module.exports.getFrecuencias = function(callback, limit) {
      Frecuencia.find({}, callback).limit(limit);
};

// get a single frequency
module.exports.getFrecuenciaById = function(id, callback) {
    Frecuencia.findById(id, callback);
};

// update frequency
module.exports.updateFrecuencia = function(id, frecuencia, options, callback) {
    var query = { _id: id };
    var updatedFrecuencia = {
        nombre: frecuencia.nombre
    };
    
    Frecuencia.findOneAndUpdate(frecuencia, updatedFrecuencia, options, callback);
};