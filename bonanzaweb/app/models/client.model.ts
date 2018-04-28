import {AccountTypeModel} from './accounttype.model';
import {DuePaymentModel} from './duepayment.model';
import {AccountPaymentActivityModel} from './duepayment.model';
import {AnnotationModel} from './annotation.model';

export class ClientModel {
    _id:string;
    creado:Date = new Date();
    ultimoAcceso:Date = new Date();
    afiliadoPrimario:AfiliadoPrimarioModel = new AfiliadoPrimarioModel();
    afiliadoSecundario:AfiliadoSecundarioModel = new AfiliadoSecundarioModel();
    cuenta:AccountTypeModel = new AccountTypeModel();
    familiaresBeneficiados:Array<FamiliarBeneficiadoModel> = new Array<FamiliarBeneficiadoModel>();
    actividadDePago:AccountPaymentActivityModel = new AccountPaymentActivityModel();
    notas:Array<AnnotationModel> = new Array<AnnotationModel>();
}

export class AfiliadoBaseModel {
    nombre:string;
    apellido:string;
    apodo:string;
    fechaDeNacimiento:string;
    actaDeNacimiento:string;
    cedula:string;
    direccion:AfiliadoDireccionModel = new AfiliadoDireccionModel();
    telefono:AfiliadoTelefonoModel = new AfiliadoTelefonoModel();
    email:string;
}

export class AfiliadoPrimarioModel extends AfiliadoBaseModel {
    miembroDesde:string;
    
    constructor() {
        super();
    }
}

export class AfiliadoSecundarioModel extends AfiliadoBaseModel { 
    constructor() {
        super();
    }
}

export class FamiliarBeneficiadoModel extends AfiliadoBaseModel {
    parentesco:string;
    direccionIgualAlAfiliado:boolean;
    
    constructor() {
        super();
    }
}



export class AfiliadoDireccionModel {
    calle:string;
    provincia:string;
    municipio:string;
    distrito:string;
    referenciaLugar:string;
}

export class AfiliadoTelefonoModel {
    casa:string;
    celular:string;
    trabajo:string;
}