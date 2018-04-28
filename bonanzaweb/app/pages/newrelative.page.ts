import {Component} from '@angular/core';
import {Routes, RouteSegment, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {BasePage} from './base.page';
import {ServiceProxy} from '../services/serviceproxy.service';
import {ClientModel, FamiliarBeneficiadoModel, AfiliadoDireccionModel} from '../models/client.model';
import {Utilities} from '../services/utils.service';

@Component({
    selector: 'newrelative-page',
    templateUrl: 'app/views/pages/newrelative.html',
    providers: [Utilities]
})
export class NewRelativePage extends BasePage {
    
    Client:any;
    SelectedClientId:string;
    Familiar:FamiliarBeneficiadoModel = new FamiliarBeneficiadoModel();
    
    Metadata:any;
    Provincia:any;
    Municipio:any;
    
    constructor(router:Router, proxy:ServiceProxy, private utils:Utilities, params:RouteSegment) {
        super(router, proxy);
        this.SelectedClientId = params.getParam('id');
        
        this.Metadata = this.proxy.Metadata;
        
        if (this.Metadata) {
        
            this.Provincia = this.Metadata.provincias[0];
            this.Municipio = this.Provincia.municipios[0];
        }
        else {
            this.proxy.handleError(null);
        }
    }
    
    ngOnInit() {
        
        this.proxy.getAfiliadoById(this.SelectedClientId).subscribe((payload:any) => {
            var currentClient = payload[0];
            this.Client = currentClient;
        });
    }
    
    backToParent() {
        this.router.navigate(["/main/afiliados/", this.SelectedClientId])
    }
    
    // for the associated relative
    onChangeProvincia(provincia:any) {
        this.Provincia = this.Metadata.provincias.filter((p:any) => { return p.provincia === provincia; })[0];
        this.Municipio = this.Provincia.municipios[0];
        this.Familiar.direccion.provincia = this.Provincia.provincia;
        this.Familiar.direccion.municipio = this.Municipio.nombre;
        this.Familiar.direccion.distrito = 
        this.Municipio.distritosMunicipales.length > 0 ? this.Municipio.distritosMunicipales[0] : "";
    }
    
    onChangeMunicipio(municipio:any) {
        this.Municipio = this.Provincia.municipios.filter((m:any) => { return m.nombre === municipio; })[0];
        this.Familiar.direccion.municipio = this.Municipio.nombre;
        this.Familiar.direccion.distrito = 
        this.Municipio.distritosMunicipales.length > 0 ? this.Municipio.distritosMunicipales[0] : "";
    }
    
    onChangeDistritoMunicipal(distrito:any) {
        this.Familiar.direccion.distrito = distrito;
    }
    
    onCreateRelative() {
        this.proxy.addFamiliarToAfiliado(this.SelectedClientId, this.Familiar).subscribe((response:any) => {
            if (response.success) {
                this.router.navigate(['/main/afiliados', this.SelectedClientId]);    
            }
        });
    }
    
    onSameAddressToggle() {
        this.Familiar.direccionIgualAlAfiliado = !this.Familiar.direccionIgualAlAfiliado;
        
        if (this.Familiar.direccionIgualAlAfiliado) {
            
            this.Provincia = this.Metadata.provincias.filter((p:any) => { return p.provincia === this.Client.afiliadoPrimario.direccion.provincia; })[0];
            this.Municipio = this.Provincia.municipios.filter((m:any) => { return m.nombre === this.Client.afiliadoPrimario.direccion.municipio; })[0];
            this.Familiar.direccion.calle = this.Client.afiliadoPrimario.direccion.calle;
            this.Familiar.direccion.provincia = this.Client.afiliadoPrimario.direccion.provincia;
            this.Familiar.direccion.municipio = this.Client.afiliadoPrimario.direccion.municipio;
            this.Familiar.direccion.distrito = this.Client.afiliadoPrimario.direccion.distrito;
            this.Familiar.direccion.referenciaLugar = this.Client.afiliadoPrimario.direccion.referenciaLugar;
        }
        else {
            this.Familiar.direccion = new AfiliadoDireccionModel();
        }
    }
}