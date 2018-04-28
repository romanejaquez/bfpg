var mongoose = require('mongoose');

var familiarBeneficiadoSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    apodo: {
        type: String
    },
    fechaDeNacimiento: {
        type: Date,
        default: Date.now
    },
    parentesco: {
        type: String,
        required: true,
    },
    actaDeNacimiento: {
        type: String,
        required: true,
    },
    direccion: {
        igualDeAfiliado: {
            type: Boolean,
            default: true
        },
        calle: {
            type: String,
            required: true
        },
        provincia: {
            type: String,
            required: true
        },
        municipio: {
            type: String,
            required: true
        },
        distrito: {
            type: String
        },
        referenciaLugar: {
            type: String,
            required: true
        }
    },
    telefono: {
        casa: {
            type: String,
            required: true
        },
        celular: {
            type: String
        },
        trabajo: {
            type: String
        }
    },
    email: {
        type: String
    }
});

var pagoPorHacerSchema = mongoose.Schema({
    transactionId: {
        type: String,
        required: true
    },
    fechaDePago: {
        type: Date,
        default: Date.now
    },
    fechaDeCiclo: {
        type: Date,
        default: Date.now  
    },
    totalAPagar: {
        type: Number,
        required: true
    },
    cantidadPaga: {
        type: Number,
        required: true
    },
    cantidadPorPagar: {
        type: Number,
        required: true
    },
    nota: {
        type: String
    }
});

var notaSchema = mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});
 
// afiliado schema
var afiliadoSchema = mongoose.Schema({
    afiliadoPrimario: {
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        apodo: {
            type: String
        },
        fechaDeNacimiento: {
            type: Date,
            default: Date.now,
            required: true
        },
        miembroDesde: {
            type: Date,
            default: Date.now,
            required: true
        },
        cedula: {
            type: String,
            required: true
        },
        direccion: {
            calle: {
                type: String,
                required: true
            },
            provincia: {
                type: String,
                required: true
            },
            municipio: {
                type: String,
                required: true
            },
            distrito: {
                type: String
            },
            referenciaLugar: {
                type: String
            }
        },
        telefono: {
            casa: {
                type: String,
                required: true
            },
            celular: {
                type: String
            },
            trabajo: {
                type: String
            }
        },
        email: {
            type: String
        },
    },
    afiliadoSecundario: {
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        apodo: {
            type: String
        },
        fechaDeNacimiento: {
            type: Date,
            default: Date.now,
            required: true
        },
        cedula: {
            type: String,
            required: true
        },
        direccion: {
            calle: {
                type: String,
                required: true
            },
            provincia: {
                type: String,
                required: true
            },
            municipio: {
                type: String,
                required: true
            },
            distrito: {
                type: String
            },
            referenciaLugar: {
                type: String
            }
        },
        telefono: {
            casa: {
                type: String,
                required: true
            },
            celular: {
                type: String
            },
            trabajo: {
                type: String
            }
        },
        email: {
            type: String
        },
    },
    cuenta: {
        tipo: {
            type: String
        },
        estado: {
            type: String
        },
        frecuenciaDePago: {
            type: String
        }
    },
    familiaresBeneficiados: {
        type: [familiarBeneficiadoSchema]
    },
    actividadDePago: {
        pagosPorHacer: {
            type: [pagoPorHacerSchema]
        }
    },
    notas: {
        type: [notaSchema]
    },
    creado: {
        type: Date,
        default: Date.now
    },
    ultimoAcceso: {
        type: Date,
        default: Date.now
    }
});

var Afiliado = module.exports = mongoose.model('Afiliados', afiliadoSchema);

// get afiliados
module.exports.getAfiliados = function(callback, limit) {
      Afiliado.find(callback).limit(limit);
};

// add afiliado
module.exports.addAfiliado = function(afiliado, callback) {
      Afiliado.create(afiliado, callback);
};

// get a single afiliado
module.exports.getAfiliadoById = function(id, callback) {
    Afiliado.findById(id, callback);
};

module.exports.getAfiliadoMostRecentlyUpdated = function(sort, limit, callback) {
    Afiliado.find(callback).sort(sort).limit(limit);
}

module.exports.addFamiliarToAfiliado = function(id, familiar, callback) {
    Afiliado.findByIdAndUpdate(id, { $push: { familiaresBeneficiados: familiar }}, { 'new': true }, callback);  
};

// get afilado by cedula 
module.exports.getAfiliadoByCedula = function(cedula, callback) {
    Afiliado.find({ 'afiliadoPrimario.cedula' : cedula }, 
    'afiliadoPrimario.nombre afiliadoPrimario.apellido afiliadoPrimario.cedula cuenta', callback);
};

module.exports.getAfiliadoById = function(id, callback) {
    Afiliado.findOne({ _id: id }, callback);
};


module.exports.getAfiliadosList = function(callback) {
    Afiliado.find({}, 'afiliadoPrimario.nombre afiliadoPrimario.apellido afiliadoPrimario.cedula cuenta', callback).limit(10); 
};

module.exports.getAfiliadosPorPagarList = function(callback) {
    Afiliado.find({}, 'afiliadoPrimario.nombre afiliadoPrimario.apellido afiliadoPrimario.cedula cuenta actividadDePago', callback); 
};

module.exports.getAfiliadosConPagosPorHacer = function(callback) {
    Afiliado.find({ 'actividadDePago.pagosPorHacer': { $not: { $size: 0 }}}, 'afiliadoPrimario.nombre afiliadoPrimario.apellido afiliadoPrimario.cedula actividadDePago.pagosPorHacer', callback).limit(2); 
};

// update afiliado
module.exports.updateAfiliado = function(id, afiliado, options, callback) {
    var query = { _id: id };
    var updatedAfiliado = {
        name: afiliado.name
    };
    
    Afiliado.findOneAndUpdate(query, updatedAfiliado, options, callback);
}

// delete afiliado
module.exports.deleteAfiliado = function(id, callback) {
    var query = { _id: id };
    Afiliado.remove(query, callback);
}