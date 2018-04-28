import {Component} from '@angular/core';
import {MakePaymentDialog} from '../dialogs/makepayment.dialog';
import {Router, RouteSegment} from '@angular/router';
import {BasePage} from './base.page';
import {ServiceProxy} from '../services/serviceproxy.service';
import {NavigationService} from '../services/navigation.service';
import {ClientModel} from '../models/client.model';
import {MetadataPipe} from '../pipes/metadata.pipe';
import {SinglePaymentModel, PaymentsCollectionModel} from '../models/payment.model';
import {AccountPaymentActivityModel, DuePaymentModel} from '../models/duepayment.model';
import {Utilities} from '../services/utils.service';

@Component({
    selector: 'paymentslist-page',
    templateUrl: 'app/views/pages/makepayment.html',
    pipes: [MetadataPipe],
    providers: [Utilities]
})
export class MakePaymentPage extends BasePage {
    
    Client:any;
    SelectedClientId:string;
    HistorialDePago:Array<any> = new Array<any>();
    PaymentSelection = { SelectAmountToPay: true, OtherAmountToPay: false, AdvancedPay: false };
    Payments:PaymentsCollectionModel = new PaymentsCollectionModel();
    AccountPaymentActivity:AccountPaymentActivityModel = new AccountPaymentActivityModel();
    TotalPaymentAmount:number = 0;
    AbonoPayment:any = null;
    
    constructor(router:Router, proxy:ServiceProxy, private navService:NavigationService, private utils:Utilities, params:RouteSegment) {
        super(router, proxy);
        this.SelectedClientId = params.getParam('id');
    }
    
    onSelectPaymentType(type: number) {
        
        $("input[type=checkbox]").removeAttr("checked");
        this.TotalPaymentAmount = 0;
        this.Payments.pagos = new Array<SinglePaymentModel>();
        this.AccountPaymentActivity.pagosPorHacer = new Array<DuePaymentModel>();
        
        switch(type) {
            case 0: {
                this.PaymentSelection.SelectAmountToPay = true;
                this.PaymentSelection.OtherAmountToPay = false;
                this.PaymentSelection.AdvancedPay = false;
            }
            break;
            case 1: {
                this.PaymentSelection.SelectAmountToPay = false;
                this.PaymentSelection.OtherAmountToPay = true;
                this.PaymentSelection.AdvancedPay = false;
            }
            break;
            case 2: {
                this.PaymentSelection.SelectAmountToPay = false;
                this.PaymentSelection.OtherAmountToPay = false;
                this.PaymentSelection.AdvancedPay = true;
            }
            break;
        }
    }
    
    onSelectPayment(selectedOption:boolean) {
        // selected payment
    }
    
    backToParent() {
        this.router.navigate(["/main/pagos"]);
    }
    
    ngOnInit() {
        this.navService.onSelectNavItemByLink('/main/pagos');
        this.proxy.getAfiliadoByIdPlusPayments(this.SelectedClientId).subscribe((payload:any) => {
            var currentClient = payload.afiliado;
            this.Client = currentClient;
            this.HistorialDePago = payload.historialDePago;
            this.AbonoPayment = this.Client.actividadDePago.pagosPorHacer.length > 0 ? 
            this.Client.actividadDePago.pagosPorHacer[0] : null;
            
            this.PaymentSelection.SelectAmountToPay = this.Client.actividadDePago.pagosPorHacer.length > 0;
            this.PaymentSelection.AdvancedPay = this.Client.actividadDePago.pagosPorHacer.length == 0;
            
            if (this.PaymentSelection.AdvancedPay) {
                $("#paymentAheadRadio").attr("checked", "checked");
            }
        });
    }
    
    addAdvancedPayment() {
        
        var singlePayment = new SinglePaymentModel();
        singlePayment.afiliadoId = this.Client._id;
        singlePayment.tipoDeCuenta = this.Client.cuenta.tipo;
        singlePayment.cantidadPaga = this.utils.getAmountToPayFromAccountType(this.Client.cuenta.tipo);
        singlePayment.totalAPagar = singlePayment.cantidadPaga;
        singlePayment.fechaDePago = new Date();
        singlePayment.fechaDeCiclo = this.utils.getDateFromFrecuencia(this.Client.cuenta.frecuenciaDePago, 
        (this.Payments.pagos.length > 0 ? this.Payments.pagos[this.Payments.pagos.length - 1].fechaDeCiclo : 
        (this.HistorialDePago.length > 0 ? new Date(this.HistorialDePago[0].fechaDeCiclo) : null)));
        singlePayment.frecuenciaDePago = this.Client.cuenta.frecuenciaDePago;
         
        this.Payments.pagos.push(singlePayment);
        
        this.processTotalPayment();
    }
    
    enableMakePaymentBtn() {
        return (this.PaymentSelection.SelectAmountToPay && !this.TotalPaymentAmount) || 
        (this.PaymentSelection.OtherAmountToPay && this.AbonoPayment && (!this.TotalPaymentAmount || this.TotalPaymentAmount > this.AbonoPayment.cantidadPorPagar));
    }
    
    convertDate(date:string) {
        return this.utils.convertDate(date);
    }
    
    onPaymentRowChecked(checked:boolean, payment:any) {
        if (checked) {
            this.TotalPaymentAmount += payment.totalAPagar;
        }
        else {
            this.TotalPaymentAmount -= payment.totalAPagar;
        }
    }
    
    processTotalPayment() {
        
        this.TotalPaymentAmount = 0;
        this.Payments.pagos.forEach((p:SinglePaymentModel, index:number) => {
            this.TotalPaymentAmount += p.cantidadPaga;
        });
    }
    
    onViewHistorialDePago() {
        
    }
    
    submitPayment() {
        
        var paymentType:string;
        
        if (this.PaymentSelection.SelectAmountToPay) {
            
            paymentType = "paymentSelection";
        }
        else if (this.PaymentSelection.OtherAmountToPay){
            
            paymentType = "abonoPayment";
            
            var abonoPayment:SinglePaymentModel = new SinglePaymentModel();
            abonoPayment.cantidadPaga = this.AbonoPayment.cantidadPaga + this.TotalPaymentAmount;
            abonoPayment.cantidadPorPagar = this.AbonoPayment.cantidadPorPagar - this.TotalPaymentAmount;
            abonoPayment.fechaDeCiclo = this.AbonoPayment.fechaDeCiclo;
            abonoPayment.fechaDePago = new Date();
            abonoPayment.nota = this.AbonoPayment.nota;
            abonoPayment.totalAPagar = this.AbonoPayment.totalAPagar;
            abonoPayment.transactionId = this.AbonoPayment.transactionId;
            abonoPayment.tipoDeCuenta = this.Client.cuenta.tipo;
            abonoPayment.frecuenciaDePago = this.Client.cuenta.frecuenciaDePago;
            abonoPayment.afiliadoId = this.Client._id;
            
            this.Payments.pagos.push(abonoPayment);
        }
        else {
            paymentType = "advancedPayment";
        }
        
        var payload = {
            paymentType: paymentType,
            pagos: this.Payments.pagos
        };
        
        this.proxy.updateAfiliadoPagos(payload).subscribe((payload:any) => {
            if (payload.success) {
                // redirect back to the user details
                this.router.navigate(["main/afiliados/", this.SelectedClientId]);
            }
        });
    }
}