export class SinglePaymentModel {
    afiliadoId:string;
    tipoDeCuenta:string;
    fechaDePago:Date = new Date();
    fechaDeCiclo:Date = new Date();
    frecuenciaDePago:string;
    creadoPor:string = "";
    totalAPagar:number;
    cantidadPaga:number;
    cantidadPorPagar:number;
    nota:string;
    transactionId:string = "";
}

export class PaymentsCollectionModel {
    pagos: Array<SinglePaymentModel> = new Array<SinglePaymentModel>();
}