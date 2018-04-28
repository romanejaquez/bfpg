import {Component} from '@angular/core';

@Component({
    selector: 'expander-component',
    templateUrl: 'app/views/controls/clientdetailsexpander.html'
})
export class ClientDetailsExpanderControl {
    
    IsExpanded:boolean = true;
}