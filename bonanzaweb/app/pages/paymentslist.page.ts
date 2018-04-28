import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {BasePage} from './base.page';
import {ServiceProxy} from '../services/serviceproxy.service';
import {NavigationService} from '../services/navigation.service';
import {MetadataPipe} from '../pipes/metadata.pipe';

@Component({
    selector: 'paymentslist-page',
    templateUrl: 'app/views/pages/paymentslist.html',
    pipes: [MetadataPipe]
})
export class PaymentsListPage extends BasePage {
    
    PaymentsPackage: any;
    constructor(router:Router, private navService:NavigationService, proxy:ServiceProxy) {
        super(router, proxy);
    }
    
    ngOnInit() {
        this.navService.onSelectNavItemByLink('/main/pagos');
        this.proxy.getAfiliadosPorPagar().subscribe((payload:any) => {
            this.PaymentsPackage = payload;
        });
    }
    
    onMakePayment(id:string) {
        this.router.navigate(['/main/pagos', id]);
    }
    
    onViewAfiliado(id:string) {
        
        this.router.navigate(['/main/afiliados', id]);
    }
    
    // lifecycle hook events
    ngAfterViewInit() {
        // Component views are initialized
        $("[data-toggle='tooltip']").tooltip();
    }
}