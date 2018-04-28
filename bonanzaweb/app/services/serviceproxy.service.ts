import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {NavigationService} from './navigation.service';

// models 
import {User} from '../models/user.model';
import {LoginInfo} from '../models/logininfo.model';
import {AnnotationModel} from '../models/annotation.model';
import {ClientModel, FamiliarBeneficiadoModel} from '../models/client.model';
import {SinglePaymentModel, PaymentsCollectionModel} from '../models/payment.model';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';



@Injectable()
export class ServiceProxy {
    
    _router: Router = null;
    constructor(private http: Http, private navService:NavigationService, router:Router) {
        this._router = router;
        
        if (localStorage['username']) {
            this.LocalSettings.Username = localStorage['username'];
            this.LocalSettings.RememberUser = true;
        }
    }
    
    Notifications = { ErrorMessage : '', RequestInProgress: false, RequestMessage: '', SuccessMessage: '' };
    LocalSettings = { RememberUser: false, Username: '' };
    Metadata:any;
    
    private baseUrl = 'http://localhost:5000/api/'; //'http://45.55.133.28:5000/api/'; // 
    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    private jwtToken = '';
    private options = new RequestOptions({ headers: this.headers });
    private authHeaders = {};
    private currentUserId = '';
    
    login(loginInfo: LoginInfo) {
        
        this.Notifications.RequestInProgress = true;
        this.Notifications.ErrorMessage = '';
        
        this.http.post(this.baseUrl + 'login', JSON.stringify(loginInfo), this.options)
        .map(res => res.json())
        .subscribe((response:any) => {
            if (response.success) {
                
                // persist the user for local storage (if needed)
                this.rememberUsername();
                
                this.jwtToken = response.token;
                this.currentUserId = response.userId;
                this.authHeaders = { headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': response.token })};
                this._router.navigate(['/main/']);
            }
            else {
                this.Notifications.ErrorMessage = response.message;
            }
            
            this.Notifications.RequestInProgress = false;
        },
        error => this.handleError(error));
    }
    
    getInitialPackage() {
        
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Obteniendo informacion...";
        
        return Observable.create((observer:any) => {
            this.http.get(this.baseUrl + 'initialPackage?userid=' + this.currentUserId, this.authHeaders)
            .map(res => res.json())
            .subscribe((response:any) => {
                
                this.Notifications.RequestInProgress = false;
                
                if (response.success) {
                    
                    this.Metadata = response.payload.metadata;
                    this.navService.User = new User(response.payload.usuario);
                    
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    this.Notifications.ErrorMessage = response.message;
                }
            },
            error => this.handleError(error));
        });
    }
    
    getAfiliados() {
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Buscando Afiliados...";
        
        return Observable.create((observer:any) => {
            this.http.get(this.baseUrl + 'afiliados', this.authHeaders)
            .map(res => res.json())
            .subscribe((response:any) => {
                
                this.Notifications.RequestInProgress = false;
                
                if (response.success) {
                    
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    this.Notifications.ErrorMessage = response.message;
                }
            },
            error => this.handleError(error));
        });
    }
    
    getAnotacionesFromUser() {
        
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Buscando Anotaciones...";
        
        return Observable.create((observer:any) => {
            this.http.get(this.baseUrl + 'anotaciones?userid=' + this.currentUserId, this.authHeaders)
            .map(res => res.json())
            .subscribe((response:any) => {
                
                this.Notifications.RequestInProgress = false;
                
                if (response.success) {
                    
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    this.Notifications.ErrorMessage = response.message;
                }
            },
            error => this.handleError(error));
        });
    }
    
    getAfiliadoByCedula(cedula:string) {
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Buscando Afiliado Por Cedula...";
        
        return Observable.create((observer:any) => {
            this.http.get(this.baseUrl + 'afiliados?cedula=' + cedula, this.authHeaders)
            .map(res => res.json())
            .subscribe((response:any) => {
                
                this.Notifications.RequestInProgress = false;
                
                if (response.success) {
                    
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    this.Notifications.ErrorMessage = response.message;
                }
            },
            error => this.handleError(error));
        });
    }
    
    getAfiliadoById(id:string) {
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Buscando Afiliado...";
        
        return Observable.create((observer:any) => {
            this.http.get(this.baseUrl + 'afiliados?id=' + id, this.authHeaders)
            .map(res => res.json())
            .subscribe((response:any) => {
                
                this.Notifications.RequestInProgress = false;
                
                if (response.success) {
                    
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    this.Notifications.ErrorMessage = response.message;
                }
            },
            error => this.handleError(error));
        });
    }
    
    getAfiliadoByIdPlusPayments(id:string) {
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Buscando Afiliado...";
        
        return Observable.create((observer:any) => {
            this.http.get(this.baseUrl + 'pagos?afiliadoId=' + id, this.authHeaders)
            .map(res => res.json())
            .subscribe((response:any) => {
                
                this.Notifications.RequestInProgress = false;
                
                if (response.success) {
                    
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    this.Notifications.ErrorMessage = response.message;
                }
            },
            error => this.handleError(error));
        });
    }
    
    updateAfiliadoPagos(payments:PaymentsCollectionModel) {
        
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Añadiendo Pagos...";
        
        return Observable.create((observer:any) => {
            this.http.post(this.baseUrl + 'pagos', JSON.stringify(payments), this.authHeaders)
            .map(res => res.json())
            .subscribe((response:any) => {
                if (response.success) {
                    
                    observer.next({ success: true });
                }
                else {
                    observer.next({ success: false });
                    this.Notifications.ErrorMessage = response.message;
                }
                
                observer.complete();
                this.Notifications.RequestInProgress = false;
            },
            error => this.handleError(error));
        });
    }
    
    getAfiliadosPorPagar() {
        
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Buscando Afiliados Por Pagar...";
        
        return Observable.create((observer:any) => {
            this.http.get(this.baseUrl + 'pagos', this.authHeaders)
            .map(res => res.json())
            .subscribe((response:any) => {
                
                this.Notifications.RequestInProgress = false;
                
                if (response.success) {
                    
                    observer.next(response.payload);
                    //call complete if you want to close this stream (like a promise)
                    observer.complete();
                }
                else {
                    this.Notifications.ErrorMessage = response.message;
                }
            },
            error => this.handleError(error));
        });
    }
    
    // posts 
    
    addAnotacion(anotacion:AnnotationModel) {
        
        anotacion.createdBy = this.currentUserId;
        anotacion.created = new Date();
        
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Añadiendo Anotación...";
        
        return Observable.create((observer:any) => {
            this.http.post(this.baseUrl + 'anotaciones', JSON.stringify(anotacion), this.authHeaders)
            .map(res => res.json())
            .subscribe((response:any) => {
                if (response.success) {
                    
                    observer.next({ success: true });
                }
                else {
                    observer.next({ success: false });
                    this.Notifications.ErrorMessage = response.message;
                }
                
                observer.complete();
                this.Notifications.RequestInProgress = false;
            },
            error => this.handleError(error));
        });
    }
    
    // post a new affiliate
    saveAfiliado(client:ClientModel) {
         
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Guardando Afiliado...";
        
        return Observable.create((observer:any) => {
            this.http.post(this.baseUrl + 'afiliados', JSON.stringify(client), this.authHeaders)
            .map(res => res.json())
            .subscribe((response:any) => {
                if (response.success) {
                    
                    observer.next({ success: true });
                }
                else {
                    observer.next({ success: false });
                    this.Notifications.ErrorMessage = response.message;
                }
                
                observer.complete();
                this.Notifications.RequestInProgress = false;
            },
            error => this.handleError(error));
        });
    }
    
    addFamiliarToAfiliado(afiliadoId:string, familiar:FamiliarBeneficiadoModel) {
        
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Guardando Familiar Beneficiado...";
        
        var familiarPackage:any = {
            afiliadoId: afiliadoId,
            familiar: familiar
        };
        
        return Observable.create((observer:any) => {
            this.http.post(this.baseUrl + 'familiares', JSON.stringify(familiarPackage), this.authHeaders)
            .map(res => res.json())
            .subscribe((response:any) => {
                if (response.success) {
                    
                    observer.next({ success: true });
                }
                else {
                    observer.next({ success: false });
                    this.Notifications.ErrorMessage = response.message;
                }
                
                observer.complete();
                this.Notifications.RequestInProgress = false;
            },
            error => this.handleError(error));
        });
    }
    
    // deletes
    deleteAnotacionById(id:string) {
        
        this.Notifications.RequestInProgress = true;
        this.Notifications.RequestMessage = "Borrando Anotación...";
        
        return Observable.create((observer:any) => {
            this.http.delete(this.baseUrl + 'anotaciones/' + id, this.authHeaders)
            .map(res => res.json())
            .subscribe((response:any) => {
                if (response.success) {
                    
                    observer.next();
                    observer.complete();
                }
                else {
                    this.Notifications.ErrorMessage = response.message;
                }
                
                this.Notifications.RequestInProgress = false;
            },
            error => this.handleError(error));
        });
    }
    
    rememberUsername() {
        if (this.LocalSettings.RememberUser) {
            localStorage["username"] = this.LocalSettings.Username;
        }
        else {
            localStorage.removeItem("username");
        }
    }
    
    handleError(error: any) {
        
        this.Notifications.RequestInProgress = false;
        
        if (error && error.status === 404) {
            this.Notifications.ErrorMessage = "Error contactando el servidor. Tratar de nuevo.";
            this._router.navigate(['/login']);
        }
        else if (error && error.status === 401) {
            this.Notifications.ErrorMessage = "Usuario no autorizado. Tratar de acceder de nuevo.";
            this._router.navigate(['/login']);
        }
        else {
            this.Notifications.ErrorMessage = "Hubo un problema en el sistema. Tratar de acceder de nuevo";
            this._router.navigate(['/login']);
        }
        
        this.navService.onSelectNavItemByLink('/main/');
    }
}