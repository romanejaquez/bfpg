import {Pipe, PipeTransform} from '@angular/core';
import {ServiceProxy} from '../services/serviceproxy.service';

@Pipe({ name: 'metadata' })
export class MetadataPipe implements PipeTransform {
    
    constructor(private proxy:ServiceProxy){}
    
    transform(value: string, exponent: string): string {
        
        switch(exponent) {
            case 'tipo':
                return this.getAccountTypeById(value);
            case 'frecuencia':
                return this.getFrecuenciaById(value);
            case 'parentesco':
                return this.getParentescoById(value);
           
        }
    }
    
    getAccountTypeById(id:string) {
        var cuenta:any = null;
        
        if (this.proxy.Metadata) {
            var allCuentas = this.proxy.Metadata.cuentas;
            
            for(var i = 0; i < allCuentas.length; i++) {
                var currentCuenta = allCuentas[i];
                
                if (currentCuenta._id === id) {
                    cuenta = currentCuenta;
                    break;
                }
            }
        }
        
        return cuenta ? cuenta.nombre : '';
    }
    
    getFrecuenciaById(id:string) {
        var frecuencia:any = null;
        
        if (this.proxy.Metadata) {
            var allFrecuencias = this.proxy.Metadata.frecuencias;
            
            for(var i = 0; i < allFrecuencias.length; i++) {
                var currentFrecuencia = allFrecuencias[i];
                
                if (currentFrecuencia._id === id) {
                    frecuencia = currentFrecuencia;
                    break;
                }
            }
        }
        
        return frecuencia ? frecuencia.nombre : '';
    }
    
    getParentescoById(id:string) {
        var parentesco:any = null;
        
        if (this.proxy.Metadata) {
            var allParentescos = this.proxy.Metadata.parentescos;
            
            for(var i = 0; i < allParentescos.length; i++) {
                var currentParentesco = allParentescos[i];
                
                if (currentParentesco._id === id) {
                    parentesco = currentParentesco;
                    break;
                }
            }
        }
        
        return parentesco ? parentesco.nombre : '';
    }
}