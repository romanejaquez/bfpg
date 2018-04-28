import {Component} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {BasePage} from './base.page';
import {ServiceProxy} from '../services/serviceproxy.service';
import {ClientDetailsPage} from './clientdetails.page';
import {ClientListPage} from './clientlist.page';
import {NewClientPage} from './newclient.page';
import {NewRelativePage} from './newrelative.page';
import {EditClientPage} from './editclient.page';

@Component({
    selector: 'clients-page',
    templateUrl: 'app/views/pages/clients.html',
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    {
        path: '/familiares/nuevo/:id',
        component: NewRelativePage
    },
    {
        path: '/nuevo',
        component: NewClientPage
    },
    {
        path: 'editar/:id',
        component: EditClientPage
    },
    {
        path: '/:id',
        component: ClientDetailsPage
    },
    {
        path: '/',
        component: ClientListPage
    }
])
export class ClientsPage {
}