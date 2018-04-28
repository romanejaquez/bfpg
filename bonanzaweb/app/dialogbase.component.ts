import {Component} from '@angular/core';
import {DialogService} from './dialog.service';

export class DialogBase {
    
    Title:string = '';
    Message:string = '';
    DialogName:string = '';
    
    constructor(public _dialogService:DialogService){}
    
    public onHideDialog() {
        this._dialogService.hideDialog(this.DialogName);
    }
    
    public onShowDialog() {
        this._dialogService.showDialog(this.DialogName);
    }
}