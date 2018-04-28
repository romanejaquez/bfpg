var mongoose = require('mongoose');

// relation schema
var parentescoSquema = mongoose.Schema({
    nombre: {
        type: String
    }
});

var Parentesco = module.exports = mongoose.model('Parentesco', parentescoSquema);

// get all payment frequencies
module.exports.getParentescos = function(callback, limit) {
      Parentesco.find({}, callback).limit(limit);
};

// get a single frequency
module.exports.getParentescoById = function(id, callback) {
    Parentesco.findById(id, callback);
};

// update frequency
module.exports.updateParentesco = function(id, parentesco, options, callback) {
    var query = { _id: id };
    var updatedParentesco = {
        nombre: parentesco.nombre
    };
    
    Parentesco.findOneAndUpdate(parentesco, updatedParentesco, options, callback);
};