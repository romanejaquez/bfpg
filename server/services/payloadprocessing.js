var mongoose = require('mongoose');
var async = require('async');
var paymentProc = require('./paymentprocessing');

// include models
Cuenta = require('../models/cuenta');
Frecuencia = require('../models/frecuencia');
Parentesco = require('../models/parentesco');
User = require('../models/user');
Anotacion = require('../models/anotacion');
Afiliado = require('../models/afiliado');
Provincia = require('../models/provincia');
Pago = require('../models/pago');

// process initial package at login
module.exports.processInitialPackage = function(userId, callback) {
  
    async.parallel({
        usuario: function(cb) {
            return User.getUserById(userId, cb); 
        },
        // get all account types
        cuentas: function(cb){
            return Cuenta.getCuentas(cb);
        },
        // get all frequencies
        frecuencias: function(cb){
            return Frecuencia.getFrecuencias(cb);
        },
        // get all frequencies
        parentescos: function(cb){
            return Parentesco.getParentescos(cb);
        },
        // get all provincias
        provincias: function(cb) {
            return Provincia.getProvincias(cb);
        },
        // get all anotations (limit to top 2)
        anotacionesRecientes: function(cb) {
            return Anotacion.getAnotacionesRecientes({ created: 'desc'}, 2, cb);
        },
        
        // most recent affiliate
        afiliadoReciente: function(cb) {
            return Afiliado.getAfiliadoMostRecentlyUpdated({ ultimoAcceso: 'desc'}, 1, cb);
        },
        
        // clients with due paymentes
        clientesPorPagar: function(cb) {
            return Afiliado.getAfiliadosConPagosPorHacer(cb);
        }, 
        
        totalPagosHoy: function(cb) {
            var todaysDate = new Date();
            var dateString = (todaysDate.getMonth() + 1) + "/" + todaysDate.getDate() + "/" + todaysDate.getFullYear();
            return Pago.getPagosUptoDate(new Date(dateString), cb);
        }, 
        
        totalPagosMes: function(cb) {
            var todaysDate = new Date();
            var dateString = (todaysDate.getMonth() + 1) + "/1/" + todaysDate.getFullYear();
            return Pago.getPagosUptoDate(new Date(dateString), cb);
        }
        
    }, function(err, results){
        if (err) {
          callback(err, results);
        }
        else {
            
            var payload = {
                usuario: { id : results.usuario._id, name: results.usuario.name, email : results.usuario.email, username:results.usuario.username },
                metadata: {
                    cuentas: results.cuentas,
                    frecuencias: results.frecuencias,
                    parentescos: results.parentescos,
                    provincias: results.provincias
                },
                totalPagosHoy: results.totalPagosHoy.length > 0 ? results.totalPagosHoy[0].total : 0,
                totalPagosMes: results.totalPagosMes.length > 0 ? results.totalPagosMes[0].total : 0,
                ultimoClienteAccedido: {
                    _id: results.afiliadoReciente[0]._id,
                    nombreCompleto: results.afiliadoReciente[0].afiliadoPrimario.apellido + ", " + results.afiliadoReciente[0].afiliadoPrimario.nombre,
                    cedula: results.afiliadoReciente[0].afiliadoPrimario.cedula,
                    tipoDeCuenta: results.afiliadoReciente[0].cuenta.tipo
                },
                clientesPorPagar: paymentProc.processAfiliadosPayments(results.clientesPorPagar),
                anotacionesRecientes: results.anotacionesRecientes
            };
            
            callback(null, payload);
        }
    });  
};

// process affiliate plus the payment history
module.exports.processAfiliadoAndPayments = function(afiliadoId, callback) {
  
    async.parallel({
        afiliado: function(cb) {
            return Afiliado.findById(afiliadoId, cb);
        },
        
        // clients with due paymentes
        historialDePago: function(cb) {
            return Pago.getPagosFromUser(afiliadoId, { fechaDeCiclo: 'desc'}, 1, cb);
        }
        
    }, function(err, results){
        if (err) {
          callback(err, results);
        }
        else {
            
            var payload = {
                afiliado: results.afiliado,
                historialDePago: results.historialDePago
            };
            
            callback(null, payload);
        }
    });  
};