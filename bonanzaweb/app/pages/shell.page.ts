import {Component} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';

/* controls */
import {HeaderControl} from '../controls/header.control';
import {SideNavControl} from '../controls/sidenav.control';
import {FooterControl} from '../controls/footer.control';

/* pages */
import {HomePage} from './home.page';
import {PaymentsPage} from './payments.page';
import {LoginPage} from './login.page';
import {ProfilePage} from './profile.page';
import {SettingsPage} from './settings.page';
import {ClientsPage} from './clients.page';
import {NotificationsPage} from './notifications.page';
import {AnnotationsPage} from './annotations.page';
import {ReportsPage} from './reports.page';
import {HelpPage} from './help.page';

@Component({
    selector: 'shell-page',
    templateUrl: 'app/views/pages/shell.html',
    directives: [
        /* controls */
        HeaderControl, 
        SideNavControl, 
        FooterControl, 
        
        /* pages from the menu */
        HomePage,       
        ClientsPage,
        PaymentsPage,
        NotificationsPage,
        
        /* additional pages */
        AnnotationsPage,
        ReportsPage,
        SettingsPage,
        HelpPage,
        
        /* other pages */
        ProfilePage,
        
        /* directives */
        ROUTER_DIRECTIVES
   ]
})
@Routes([
 {
   path: '/',
   component: HomePage
 },
 {
     path: '/afiliados',
     component: ClientsPage
 },
 {
    path: '/pagos',
    component: PaymentsPage
 },
 {
    path: '/notificaciones',
    component: NotificationsPage
 },
 {
     path: '/perfil',
     component: ProfilePage
 },
 {
    path: '/anotaciones',
    component: AnnotationsPage
 },
 {
    path: '/reportes',
    component: ReportsPage
 },
 {
     path: '/ajustes',
     component: SettingsPage
 },
 {
    path: '/ayuda',
    component: HelpPage
 }
])
export class ShellPage {
    constructor(private _router:Router) {
        //this._router.navigate['./main/inicio'];   
    }
}