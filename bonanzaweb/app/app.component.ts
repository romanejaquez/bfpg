import {Component, ViewChild} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';

/* pages */
import {ShellPage} from './pages/shell.page';
import {LoginPage} from './pages/login.page';

@Component({
    selector: 'bonanza-app',
    templateUrl: 'app/views/bonanza.html',
    directives: [      
        /* pages */
        ShellPage,
        LoginPage,
        
        /* directives */
        ROUTER_DIRECTIVES
   ]
})
@Routes([
 {
   path: '/login',
   component: LoginPage  
 },
 {
   path: '/main',
   component: ShellPage
 }
])
export class AppComponent { 
    constructor(private _router:Router) {
        this._router.navigate(['/login']);
    }
}