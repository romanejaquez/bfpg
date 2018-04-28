import {Component} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';

export class DialogBase {

    public Message:string;
    
    constructor(public _router:Router, 
                public Title:string, 
                public DialogName:string, 
                public ParentPath:string){   
    }
    
    public onHideDialog() {
        this._router.navigate([this.ParentPath]);
    }
}