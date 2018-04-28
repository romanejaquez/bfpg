import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BasePage} from './base.page';
import {ServiceProxy} from '../services/serviceproxy.service';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {AddAnnotationDialog} from '../dialogs/addnote.dialog';
import {ConfirmationDialog} from '../dialogs/confirmation.dialog';
import {DialogService} from '../services/dialogservice.service';
import {Utilities} from '../services/utils.service';

@Component({
    selector: 'annotations-page',
    templateUrl: 'app/views/pages/annotations.html',
    directives: [ConfirmationDialog, ROUTER_DIRECTIVES],
    providers: [Utilities]
})
@Routes([
    {
        path: '/nueva',
        component: AddAnnotationDialog
    },
    {
        path: '/borrar',
        component: ConfirmationDialog, 
        
    }
])
export class AnnotationsPage extends BasePage {
    
    @ViewChild(ConfirmationDialog) confirmationDialog:ConfirmationDialog;
    
    Anotaciones:Array<any>;
    
    constructor(router:Router, proxy:ServiceProxy, private dialogService:DialogService, private utils:Utilities) {
        super(router, proxy);
    }
    
    ngOnInit() {
        
        this.retrieveAnotaciones();
    }
    
    retrieveAnotaciones() {
        this.proxy.getAnotacionesFromUser().subscribe((payload:any) => {
            this.Anotaciones = payload;
        });
    }
    
    addAnotationDialog() {
        
        this.router.navigate(['/main/anotaciones/nueva']);
        this.dialogService.showAddAnotacion('/main/anotaciones/nueva', '/main/anotaciones', () => {
            this.retrieveAnotaciones();
        });
    }

    convertDate(date:string) {
        return this.utils.getFullDateString(date);
    }
    
    deleteAnotation(id:string) {
        
        this.dialogService.showMessage("Borrar Anotacion", 
        "Esta seguro de querer borrar esta anotacion?", 
        '/main/anotaciones/borrar', 
        '/main/anotaciones', () => {
            this.proxy.deleteAnotacionById(id).subscribe(() => {
                this.retrieveAnotaciones();
            });
        });
    }
    
    // lifecycle hook events
    ngAfterViewInit() {
        // Component views are initialized
        $("[data-toggle='tooltip']").tooltip();
    }
}