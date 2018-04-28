import {Component} from '@angular/core';
import {DialogBase} from './dialogbase.dialog';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'addclient-dialog',
    templateUrl: 'app/views/dialogs/addclient.html'
})
export class AddClientDialog extends DialogBase {
    
    constructor(_router:Router) {
        super(_router, "Anadir Afiliado", "addClientModal", "/main/afiliados");
    }
    
    // lifecycle hook events
    ngAfterViewInit(){
        $('#' + this.DialogName).draggable({ handle: '.modal-header'});
    }
}