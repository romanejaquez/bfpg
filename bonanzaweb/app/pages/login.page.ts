import {Component} from '@angular/core';
import {LoginInfo} from '../models/logininfo.model';
import {BasePage} from './base.page';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {ServiceProxy} from '../services/serviceproxy.service';
import {NgForm} from '@angular/common';

@Component({
    selector: 'login-page',
    templateUrl: 'app/views/pages/login.html'
})
export class LoginPage extends BasePage {
    
    loginInfo:LoginInfo = new LoginInfo();
    LocalSettings = {};
    
    constructor(router:Router, proxy:ServiceProxy) {
        super(router, proxy);
        this.LocalSettings = this.proxy.LocalSettings;
        this.loginInfo.username = this.proxy.LocalSettings.Username;
    }
    
    onLogin() {
        this.proxy.login(this.loginInfo);
    }
    
    onRememberUser(remember:boolean) {
        if (remember) {
            this.proxy.LocalSettings.RememberUser = true;
            this.proxy.LocalSettings.Username = this.loginInfo.username;
        }
        else {
            this.proxy.LocalSettings.RememberUser = false;
            this.proxy.LocalSettings.Username = '';
        }
    }
}