import {Component} from '@angular/core';
import {BasePage} from './base.page';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {ServiceProxy} from '../services/serviceproxy.service';
import {Observable} from 'rxjs/Observable';
import {MetadataPipe} from '../pipes/metadata.pipe';

@Component({
    selector: 'home-page',
    templateUrl: 'app/views/pages/home.html',
    pipes: [MetadataPipe]
})
export class HomePage extends BasePage {
    
    InitialPackage:any;
    
    constructor(router:Router, proxy:ServiceProxy) {
        super(router, proxy);
    }
    
    ngOnInit() {
        
        this.proxy.getInitialPackage().subscribe((payload:any) => {
            this.InitialPackage = payload;
        });
    }
    
    onMakePayment(afiliadoId:string) {
        this.router.navigate(['/main/pagos', afiliadoId]);
    }
    
    onViewAfiliado(afiliadoId:string) {
        this.router.navigate(['/main/afiliados', afiliadoId]);
    }
    
    // lifecycle hook events
    ngAfterViewInit() {
        // Component views are initialized
        $("[data-toggle='tooltip']").tooltip();
    }
}