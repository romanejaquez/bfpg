import {Component} from '@angular/core';
import {MakePaymentPage} from './makepayment.page';
import {PaymentsListPage} from './paymentslist.page';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {BasePage} from './base.page';
import {ServiceProxy} from '../services/serviceproxy.service';

@Component({
    selector: 'payments-page',
    templateUrl: 'app/views/pages/payments.html',
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    {
        path: '/',
        component: PaymentsListPage
    },
    {
        path: '/:id',
        component: MakePaymentPage
    }
])
export class PaymentsPage {
}