import {Component} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {BasePage} from './base.page';
import {ServiceProxy} from '../services/serviceproxy.service';
import {MetadataPipe} from '../pipes/metadata.pipe';

@Component({
    selector: 'clientlist-page',
    templateUrl: 'app/views/pages/clientlist.html',
    pipes: [MetadataPipe]
})
export class ClientListPage extends BasePage {
    
    Afiliados: Array<any>;
    
    constructor(router:Router, proxy:ServiceProxy) {
        super(router, proxy);
    }
    
    ngOnInit() {
        
        this.proxy.getAfiliados().subscribe((payload:any) => {
            this.Afiliados = payload;
        });
    }
    
    onViewAfiliado(id:string) {
        
        this.router.navigate(['/main/afiliados', id]);
    }
    
    onGetAfiliadoByCedula(cedula:string) {
        this.proxy.getAfiliadoByCedula(cedula).subscribe((payload:any) => {
            this.Afiliados = payload;
        });
    }
    
    onAddAfiliado() {
        this.router.navigate(['/main/afiliados/nuevo']);
    }
    
    /*getAccountType(id:string) {
        return this.utils.getAccountTypeById(id);
    }*/
}