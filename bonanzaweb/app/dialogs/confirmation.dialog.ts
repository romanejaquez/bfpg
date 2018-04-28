import {Component} from '@angular/core';
import {DialogBase} from './dialogbase.dialog';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {DialogService} from '../services/dialogservice.service';

@Component({
    selector: 'confirmation-dialog',
    templateUrl: 'app/views/dialogs/confirmation.html'
})
export class ConfirmationDialog extends DialogBase {

    constructor(_router:Router, private _dialogService:DialogService) {
        super(_router, "Confirmar", "confirmationModal", _dialogService.ParentRoute);
        
        this.Title = _dialogService.Title;
        this.Message = _dialogService.Message;
    }
    
    onAceptarClick() {
        // execute the provided callback
        this._dialogService.Callback();
        
        // then dismiss the dialog
        this.onHideDialog();
    }
    
    // lifecycle hook events
    ngAfterViewInit(){
        $('#' + this.DialogName).draggable({ handle: '.modal-header'});
    }
}