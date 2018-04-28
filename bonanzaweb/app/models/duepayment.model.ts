export class DuePaymentModel {
    totalAPagar:number;
    cantidadPaga:number;
    cantidadPorPagar:number;
    fechaDeCiclo:Date = new Date();
    fechaDePago:Date = new Date();
    nota:string;
    transactionId:string;
    _id:string;
}

export class AccountPaymentActivityModel {
    pagosPorHacer: Array<DuePaymentModel> = new Array<DuePaymentModel>();   
}