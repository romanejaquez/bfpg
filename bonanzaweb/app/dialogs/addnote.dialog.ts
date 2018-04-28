import {Component} from '@angular/core';
import {DialogBase} from './dialogbase.dialog';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {AnnotationModel} from '../models/annotation.model';
import {ServiceProxy} from '../services/serviceproxy.service';
import {DialogService} from '../services/dialogservice.service';

@Component({
    selector: 'addannotation-dialog',
    templateUrl: 'app/views/dialogs/addannotation.html'
})
export class AddAnnotationDialog extends DialogBase {
    
    Annotation:AnnotationModel = new AnnotationModel();
    MaxChars:number = 200;
        
    constructor(_router:Router, private proxy:ServiceProxy, private dialogService:DialogService) {
        super(_router, "Anadir Nueva Anotacion", "addAnnotationModal", "/main/anotaciones");
    }
    
    // lifecycle hook events
    ngAfterViewInit(){
        $('#' + this.DialogName).draggable({ handle: '.modal-header'});
    }
    
    onAddAnnotation() {
        
        this.proxy.addAnotacion(this.Annotation).subscribe((payload:any) => {
            this.onHideDialog();
            
            if(payload.success) {
                this.dialogService.Callback();
            }
        });
    }
}