import {Component} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {BasePage} from './base.page';
import {ServiceProxy} from '../services/serviceproxy.service';
import {ClientModel} from '../models/client.model';

@Component({
    selector: 'newclient-page',
    templateUrl: 'app/views/pages/newclient.html'
})
export class NewClientPage extends BasePage {
    
    Metadata:any;
    Client:ClientModel = new ClientModel();    
    Provincia:any;
    Municipio:any;
    
    SecProvincia:any;
    SecMunicipio:any;
    
    constructor(router:Router, proxy:ServiceProxy) {
        super(router, proxy);
        
        this.PageTitle = "Nuevo Afiliado";
        this.Metadata = this.proxy.Metadata;
        
        if (this.Metadata) {
        
            this.Provincia = this.Metadata.provincias[0];
            this.Municipio = this.Provincia.municipios[0];
            
            this.SecProvincia = this.Metadata.provincias[0];
            this.SecMunicipio = this.Provincia.municipios[0];
        }
        else {
            this.proxy.handleError(null);
        }
    }
    
    backToParent() {
        this.router.navigate(["/main/afiliados"]);
    }
       
    // for the primary affiliate
    onChangeProvincia(provincia:any) {
        this.Provincia = this.Metadata.provincias[parseInt(provincia)];
        this.Municipio = this.Provincia.municipios[0];
        this.Client.afiliadoPrimario.direccion.provincia = this.Provincia.provincia;
        this.Client.afiliadoPrimario.direccion.municipio = this.Municipio.nombre;
        this.Client.afiliadoPrimario.direccion.distrito = 
        this.Municipio.distritosMunicipales.length > 0 ? this.Municipio.distritosMunicipales[0] : "";
    }
    
    onChangeMunicipio(municipio:any) {
        this.Municipio = this.Provincia.municipios[parseInt(municipio)];
        this.Client.afiliadoPrimario.direccion.municipio = this.Municipio.nombre;
        this.Client.afiliadoPrimario.direccion.distrito = 
        this.Municipio.distritosMunicipales.length > 0 ? this.Municipio.distritosMunicipales[0] : "";
    }
    
    onChangeDistritoMunicipal(distrito:any) {
        this.Client.afiliadoPrimario.direccion.distrito = this.Municipio.distritosMunicipales[distrito];
    }
    
    // for the secondary affiliate
    onChangeSecProvincia(provincia:any) {
        this.SecProvincia = this.Metadata.provincias[parseInt(provincia)];
        this.SecMunicipio = this.SecProvincia.municipios[0];
        this.Client.afiliadoSecundario.direccion.provincia = this.SecProvincia.provincia;
        this.Client.afiliadoSecundario.direccion.municipio = this.SecMunicipio.nombre;
        this.Client.afiliadoSecundario.direccion.distrito = 
        this.SecMunicipio.distritosMunicipales.length > 0 ? this.SecMunicipio.distritosMunicipales[0] : "";
    }
    
    onChangeSecMunicipio(municipio:any) {
        this.SecMunicipio = this.SecProvincia.municipios[parseInt(municipio)];
        this.Client.afiliadoSecundario.direccion.municipio = this.SecMunicipio.nombre;
        this.Client.afiliadoSecundario.direccion.distrito = 
        this.SecMunicipio.distritosMunicipales.length > 0 ? this.SecMunicipio.distritosMunicipales[0] : "";
    }
    
    onChangeSecDistritoMunicipal(distrito:any) {
        this.Client.afiliadoSecundario.direccion.distrito = this.SecMunicipio.distritosMunicipales[distrito];
    }
    
    // submit
    onCreateClient() {
        this.proxy.saveAfiliado(this.Client).subscribe((response:any) => {
            if (response.success) {
                this.router.navigate(['/main/afiliados']);    
            }
        });
    };
}