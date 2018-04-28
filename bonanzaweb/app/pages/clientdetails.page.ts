import {Component} from '@angular/core';
import {AddClientDialog} from '../dialogs/addclient.dialog';
import {Routes, RouteSegment, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {BasePage} from './base.page';
import {ServiceProxy} from '../services/serviceproxy.service';
import {NavigationService} from '../services/navigation.service';
import {ClientModel} from '../models/client.model';
import {ClientDetailsExpanderControl} from '../controls/clientdetailsexpander.control';
import {MetadataPipe} from '../pipes/metadata.pipe';
import {Utilities} from '../services/utils.service';

@Component({
    selector: 'clientdetails-page',
    templateUrl: 'app/views/pages/clientdetails.html',
    directives: [AddClientDialog, ClientDetailsExpanderControl, ROUTER_DIRECTIVES],
    pipes: [MetadataPipe],
    providers: [Utilities]
})
export class ClientDetailsPage extends BasePage {
    
    Client:ClientModel;
    SelectedClientId:string;
   
    constructor(router:Router, proxy:ServiceProxy, private utils:Utilities, private navService:NavigationService, params:RouteSegment) {
        super(router, proxy);
        this.SelectedClientId = params.getParam('id');
    }
    
    ngOnInit() {
        this.navService.onSelectNavItemByLink('/main/afiliados');
        this.proxy.getAfiliadoById(this.SelectedClientId).subscribe((payload:any) => {
            var currentClient = payload;
            this.Client = currentClient;
        });
    }
    
    backToParent() {
        this.router.navigate(["/main/afiliados"]);
    }
    
    editAfiliado() {
        this.router.navigate(["/main/afiliados/editar", this.SelectedClientId]);
    }
    
    convertDate(date:string) {
        return this.utils.convertDate(date);
    }
    
    onMakePayment(id:string) {
        this.router.navigate(['/main/pagos', this.SelectedClientId]);
    }
    
    onAddRelative(){
        this.router.navigate(['/main/afiliados/familiares/nuevo', this.SelectedClientId]);
    }
}