import {ServiceProxy} from './serviceproxy.service';
import {Injectable} from '@angular/core';
import {ClientModel} from '../models/client.model';
import {SinglePaymentModel} from '../models/payment.model';

@Injectable()
export class Utilities {
    
    proxy:ServiceProxy;
    
    constructor(proxy:ServiceProxy){
        this.proxy = proxy;   
    }
    
    convertDate(date:string) {
        return new Date(date);
    }

    formatClientDateString(client:ClientModel) {

        var clientDOB = new Date(client.afiliadoPrimario.fechaDeNacimiento);
        var clientDOBFormat = clientDOB.getFullYear().toString() + '-' +
        ((clientDOB.getMonth() + 1) < 10 ? ("0" + (clientDOB.getMonth() + 1)) : (clientDOB.getMonth() + 1)).toString() + '-' +
        ((clientDOB.getDate() + 1) < 10 ? ("0" + (clientDOB.getDate() + 1)) : (clientDOB.getDate() + 1)).toString();
        client.afiliadoPrimario.fechaDeNacimiento = clientDOBFormat;

        clientDOB = new Date(client.afiliadoSecundario.fechaDeNacimiento);
        clientDOBFormat = clientDOB.getFullYear().toString() + '-' +
        ((clientDOB.getMonth() + 1) < 10 ? ("0" + (clientDOB.getMonth() + 1)) : (clientDOB.getMonth() + 1)).toString() + '-' +
        ((clientDOB.getDate() + 1) < 10 ? ("0" + (clientDOB.getDate() + 1)) : (clientDOB.getDate() + 1)).toString();
        client.afiliadoSecundario.fechaDeNacimiento = clientDOBFormat;
    }
    
    getFullDateString(date:string) {
        var d = new Date(date);
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " a las " + 
        (d.getHours() > 12 ? (d.getHours() - 12) : d.getHours()) + ":" + d.getMinutes() + " " + (d.getHours() > 12 ? "PM" : "AM");
    }
    
    getAmountToPayFromAccountType(type:string):number {
        
        var amount = 0;
        if (this.proxy.Metadata){
            var accountType = this.proxy.Metadata.cuentas.filter((f:any) => { return f._id == type; })[0];
            amount = accountType.cantidadAPagar;
        }
        
        return amount;
    }
    
    getDateFromFrecuencia(frecuencia:string, lastPayment:Date):Date {
        
        var date = new Date();
        var daysToApplyFrecuencia = 0;
        
        if (this.proxy.Metadata){
            var frecuenciaObj = this.proxy.Metadata.frecuencias.filter((f:any) => { return f._id == frecuencia; })[0];
            
            switch(frecuenciaObj.nombre) {
                case "Semanal":
                daysToApplyFrecuencia = 7;
                return this.adjustDate(lastPayment, daysToApplyFrecuencia);
                case "Quincenal":
                daysToApplyFrecuencia = 14;
                return this.adjustDate(lastPayment, daysToApplyFrecuencia);
                case "Mensual":
                {
                    var d = lastPayment || new Date();
                    return new Date(d.getFullYear(), d.getMonth() + 2, 1);
                }
            }
        }
    }
    
    adjustDate(fechaDeCiclo:Date, daysToApply:number) {
        
        var d = fechaDeCiclo || new Date();
        var dayOfMonth = d.getDate();
        
        switch(d.getDay()) {
            case 0: // sunday
                d.setDate(dayOfMonth - 6);
            break;
            case 1: // monday
                if (fechaDeCiclo) {
                    d.setDate(dayOfMonth + daysToApply);
                }
            break;
            case 2: // tuesday
                d.setDate(dayOfMonth - 1);
            break;
            case 3: // wednesday
                d.setDate(dayOfMonth - 2);
            break;
            case 4: // thursday
                d.setDate(dayOfMonth - 3);
            break;
            case 5: // friday
                d.setDate(dayOfMonth - 4);
            break;
            case 6: // saturday
                d.setDate(dayOfMonth - 5);
            break;
        }
        
        return d;
    }
}