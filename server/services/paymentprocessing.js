var mongoose = require('mongoose');
var schedule = require('node-schedule');
var async = require('async');

// include models
Cuenta = require('../models/cuenta');
Frecuencia = require('../models/frecuencia');
Parentesco = require('../models/parentesco');
User = require('../models/user');
Anotacion = require('../models/anotacion');
Afiliado = require('../models/afiliado');
Pago = require('../models/pago');

var defaultInitialPayment = 100; 

function generateTransactionId() {
    return "BFPG-" + (Math.random()*1e16).toString(36).toUpperCase() + "-" + (Math.random()*1e16).toString(36).toUpperCase();
}

function processPaymentDateForAfiliado(lastPayment, frecuencia) {
    var lastPaymentDate = lastPayment || new Date();
    var daysToApplyFrecuencia = 0;
    
    switch(frecuencia.nombre) {
            case "Semanal":
            daysToApplyFrecuencia = 7;
            return adjustDate(lastPaymentDate, daysToApplyFrecuencia);
            case "Quincenal":
            daysToApplyFrecuencia = 14;
            return adjustDate(lastPaymentDate, daysToApplyFrecuencia);
            case "Mensual":
            {
                return new Date(lastPaymentDate.getFullYear(), lastPaymentDate.getMonth() + 2, 1);
            }
        } 
}
    
// adjusts the date based on the last payments (cycle date) and the number of days to apply to the new date
function adjustDate(fechaDeCiclo, daysToApply) {
    
    var d =  new Date(fechaDeCiclo.getFullYear(), fechaDeCiclo.getMonth(), fechaDeCiclo.getDate());
    var dayOfMonth = d.getDate();
    
    switch(d.getDay()) {
        case 0: // sunday
            d.setDate(dayOfMonth - 6);
            dayOfMonth = d.getDate();
            d.setDate(dayOfMonth + daysToApply);
        break;
        case 1: // monday
            if (fechaDeCiclo) {
                d.setDate(dayOfMonth + daysToApply);
            }
        break;
        case 2: // tuesday
        case 3: // wednesday
        case 4: // thursday
        case 5: // friday
        case 6: // saturday
            d.setDate(dayOfMonth - (d.getDay() - 1));
            dayOfMonth = d.getDate();
            d.setDate(dayOfMonth + daysToApply);
        break;
    }
    
    return d;
}

// based on the user's type of account and frequency of payment, add a payment activity entry per user
var paymentScheduler = schedule.scheduleJob('*/1 * * * *', function(){

    async.parallel({
        // get all account types
        cuentas: function(cb){
            return Cuenta.getCuentas(cb);
        },
        // get all frequencies
        frecuencias: function(cb){
            return Frecuencia.getFrecuencias(cb);
        },
        // get all frequencies
        afiliados: function(cb){
            return Afiliado.getAfiliados(cb);
        }
        
    }, function(err, results){
        if (err) {
            console.log(err);
        }
        else {
            
            var cuentas = results.cuentas;
            var frecuencias = results.frecuencias;
            var afiliados = results.afiliados;
            
            for(var i = 0; i < afiliados.length; i++) {
                
                var currentAfiliado = afiliados[i];
                var frecuenciaDeAfiliado = frecuencias.filter(function(f) { return f._id.toString() === currentAfiliado.cuenta.frecuenciaDePago; })[0];
                var cuentaDeAfiliado = cuentas.filter(function(c) { return c._id.toString() === currentAfiliado.cuenta.tipo; })[0];
                var lastPayment = null;
                
                if (currentAfiliado.actividadDePago && currentAfiliado.actividadDePago.pagosPorHacer.length > 0) {
                    lastPayment = 
                    currentAfiliado.actividadDePago.pagosPorHacer[currentAfiliado.actividadDePago.pagosPorHacer.length - 1].fechaDeCiclo;
                    processPayment(lastPayment, currentAfiliado._id, frecuenciaDeAfiliado, cuentaDeAfiliado);
                }
                else {
                    
                    processPayment(lastPayment, currentAfiliado._id, frecuenciaDeAfiliado, cuentaDeAfiliado);

                    /*
                    // check if there is an advanced payment
                    Pago.getLastPagoFromUser(currentAfiliado._id, function(err, lastPago) {
                        
                        // if frequency is monthly (mensual)
                        // check if there's a last payment
                        if (lastPago && lastPago.length > 0) {
                            lastPayment = lastPago[0].fechaDeCiclo;
                            
                            processPayment(lastPayment, currentAfiliado._id, frecuenciaDeAfiliado, cuentaDeAfiliado);
                        }
                        else {
                            processPayment(lastPayment, currentAfiliado._id, frecuenciaDeAfiliado, cuentaDeAfiliado);
                        }
                    });
                    */
                }
            }
        }
    });

});

function processPayment(lastPayment, afiliadoId, frecuenciaDeAfiliado, cuentaDeAfiliado) {
    
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);

    if (!lastPayment || currentDate > lastPayment) {
        
        // one week in advance, add the payment reminder entry
        var pagoPorHacerSchema = {
            transactionId: generateTransactionId(),
            fechaDePago: new Date(),
            fechaDeCiclo: processPaymentDateForAfiliado(lastPayment, frecuenciaDeAfiliado),
            totalAPagar: cuentaDeAfiliado.cantidadAPagar,
            cantidadPaga: 0,
            cantidadPorPagar: cuentaDeAfiliado.cantidadAPagar,
            nota: ""
        };
        
        Afiliado.update({ _id: afiliadoId }, { $push: { "actividadDePago.pagosPorHacer": pagoPorHacerSchema }}, function(err, update) {
            if (err) {
                console.log(err);
            }
        });
    }
}

module.exports.processAbonoPayments = function(payments, callback) {
    
    // before inserting, append a transaction id to each payment
    for(var i = 0; i < payments.length; i++) {
        
        var currentPayment = payments[i];
        
        if (currentPayment.cantidadPorPagar == 0) {
            Pago.addPago(currentPayment, function(err, addedPago) {
                
                if (err) {
                    callback(err, addedPago);
                }
                else {
                    // if it was added successfully, then remove it from the user's list
                    Afiliado.update({ _id: currentPayment.afiliadoId }, { $pull: { "actividadDePago.pagosPorHacer": { transactionId: currentPayment.transactionId }}}, function(afiliadoErr, update) {
                        callback(afiliadoErr, update);
                    });
                }
            });
        }
        else {

            Afiliado.update({ _id: currentPayment.afiliadoId, "actividadDePago.pagosPorHacer.transactionId" : currentPayment.transactionId }, 
                { $set: { 
                    "actividadDePago.pagosPorHacer.$.cantidadPaga": currentPayment.cantidadPaga, 
                    "actividadDePago.pagosPorHacer.$.cantidadPorPagar": currentPayment.cantidadPorPagar, 
                    "actividadDePago.pagosPorHacer.$.fechaDePago": currentPayment.fechaDePago 
                }}, function(err, update) {
                callback(err, update);
            });
        }
    }

};

module.exports.processUserAdvancedPayments = function(payments, callback) {
    
    // before inserting, append a transaction id to each payment
    for(var i = 0; i < payments.length; i++) {
        var currentPayment = payments[i];
        currentPayment.transactionId = generateTransactionId();
    }
    
    Pago.addPago(payments, callback);
};

module.exports.processAfiliadosPayments = function(afiliados) {
    
    var processedAfiliados = [];
    
    afiliados.forEach(function(afiliado, index) {
        
        var cantidadTotalPorPagar = 0;
        afiliado.actividadDePago.pagosPorHacer.forEach((pago, index) => {        
            cantidadTotalPorPagar += pago.cantidadPorPagar;
        });
        
        // create a stripped down version of the affiliate
        processedAfiliados.push({
            _id: afiliado._id,
            nombre: afiliado.afiliadoPrimario.apellido + ", " + afiliado.afiliadoPrimario.nombre,
            cedula: afiliado.afiliadoPrimario.cedula,
            cantidadQueDebe: cantidadTotalPorPagar
        })
    });
    
    return processedAfiliados;
};

// process all clients that need to pay
module.exports.processAllAfiliadosToPay = function(callback) {
    
    Afiliado.getAfiliadosPorPagarList(function(err, afiliados) {
        if (err) {
             //callback(err);
        } 
        else {
            
            var afiliadosAPagar = [];
            var cantidadTotalACobrar = 0;
            
            // loop through each afiliado that has a due payment, as well as collect the total amount to be charged among all of them
            afiliados.forEach((afiliado, index) => {
               
               if (afiliado.actividadDePago.pagosPorHacer.length > 0) {
                   
                   // attach a dynamic property here to collect all payments due for this single afiliado
                   var cantidadTotalPorPagar = 0;
                    
                   afiliado.actividadDePago.pagosPorHacer.forEach((pago, index) => {
                      
                      cantidadTotalPorPagar += pago.cantidadPorPagar;
                      // collect the amount to charge across all afiliados
                      cantidadTotalACobrar += pago.cantidadPorPagar; 
                   });
                   
                   afiliadosAPagar.push({
                      _id: afiliado._id,
                      afiliadoPrimario: afiliado.afiliadoPrimario,
                      actividadDePago : afiliado.actividadDePago,
                      cuenta: afiliado.cuenta,
                      cantidadTotalPorPagar:  cantidadTotalPorPagar
                   });
               } 
            });
            
            callback(null, {
                afiliados: afiliadosAPagar,
                cantidadTotalACobrar: cantidadTotalACobrar
            });
        }
    });
};