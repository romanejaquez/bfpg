import {Injectable} from '@angular/core';
import {Routes, Router} from '@angular/router';

@Injectable()
export class DialogService {
    
    Title:string;
    Message:string;
    ParentRoute:string;
    Callback:Function;
    
    constructor(private _router:Router){}
    
    showMessage(title:string, message:string, route:string, parentroute:string, callback:Function) {
        
        this.Title = title;
        this.Message = message;
        this.ParentRoute = parentroute;
        this.Callback = callback;
        
        this._router.navigate([route]);
    }
    
    showAddAnotacion(route:string, parentroute:string, callback:Function) {
        
        this.ParentRoute = parentroute;
        this.Callback = callback;
        
        this._router.navigate([route]);
    }
}