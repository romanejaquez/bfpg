var mongoose = require('mongoose');

// municipio schema
var municipioSchema = mongoose.Schema({
    nombre: {
        type: String
    },
    distritosMunicipales: [String]
})
// provincia schema
var provinciaSchema = mongoose.Schema({
    provincia: {
        type: String
    },
    municipios: [municipioSchema]
});

var Provincia = module.exports = mongoose.model('Provincia', provinciaSchema);

// get all account types
module.exports.getProvincias = function(callback, limit) {
      Provincia.find({}, callback).limit(limit);
};