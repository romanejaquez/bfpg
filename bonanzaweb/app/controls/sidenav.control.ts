import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationService} from '../services/navigation.service';
import {NavigationItem} from '../models/navitem.model';

@Component({
    selector: 'sidenav-control',
    templateUrl: 'app/views/controls/sidenav.html'
})
export class SideNavControl {
    
    constructor(private _router:Router, public navService:NavigationService) {}
    
    onSideNavClick(selectedNavItem:NavigationItem) {
        this.navService.onSelectNavItem(selectedNavItem);
        this._router.navigate([selectedNavItem.Path]);
    }
    
    // lifecycle hook events
    ngAfterViewInit() {
        // Component views are initialized
        $(".sideNavWrapper [data-toggle='tooltip']").tooltip();
    }
}