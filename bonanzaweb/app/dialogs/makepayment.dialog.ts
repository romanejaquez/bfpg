import {Component} from '@angular/core';
import {DialogBase} from './dialogbase.dialog';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'makepayment-dialog',
    templateUrl: 'app/views/dialogs/makepayment.html'
})
export class MakePaymentDialog extends DialogBase {
    
    PaymentSelection = { SelectAmountToPay: false, OtherAmountToPay: false };
    
    constructor(_router:Router) {
        super(_router, "Hacer Pago", "makePaymentModal", '/main/pagos');
    }
    
    onSelectPayment(selectedOption:boolean) {
        
    }
    
    // lifecycle hook events
    ngAfterViewInit(){
        $('#' + this.DialogName).draggable({ handle: '.modal-header'});
    }
}