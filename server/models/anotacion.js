var mongoose = require('mongoose');

// annotations schema
var anotacionSchema = mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId
    }
});

var Anotacion = module.exports = mongoose.model('Anotaciones', anotacionSchema);

// get annotations
module.exports.getAnotaciones = function(sort, limit, callback) {
      Anotacion.find(callback).sort(sort).limit(limit);
};

// get recent annotations
module.exports.getAnotacionesRecientes = function(sort, limit, callback) {
      Anotacion.find(callback).sort(sort).limit(limit);
};

// add annotation
module.exports.addAnotacion = function(anotacion, callback) {
      Anotacion.create(anotacion, callback);
};

// get a single annotation
module.exports.getAnotacionById = function(id, callback) {
    Anotacion.findById(id, callback);
};

// get all annotations from a given user
module.exports.getAnotacionesFromUser = function(id, sort, callback) {
    Anotacion.find({ createdBy: id }, callback).sort(sort);
};

// update annotation
module.exports.updateAnotacion = function(id, anotacion, options, callback) {
    var query = { _id: id };
    var updatedAnotacion = {
        name: anotacion.name
    };
    
    Anotacion.findOneAndUpdate(query, updatedAnotacion, options, callback);
}

// delete annotation
module.exports.deleteAnotacion = function(id, callback) {
    var query = { _id: id };
    Anotacion.remove(query, callback);
}