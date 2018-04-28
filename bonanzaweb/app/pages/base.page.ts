import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {ServiceProxy} from '../services/serviceproxy.service';

export class BasePage {
    
    public Notifications: {};
    public proxy:ServiceProxy = null;
    public router:Router = null;
    public PageTitle:string = "";
    
    constructor(_router:Router, _proxy:ServiceProxy) {
        this.proxy = _proxy;
        this.router = _router;
        this.Notifications = this.proxy.Notifications;
    }
}