import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {NavigationService} from '../services/navigation.service';

@Component({
    selector: 'header-control',
    templateUrl: 'app/views/controls/header.html'
})
export class HeaderControl {
    
    constructor(private router:Router, private navService:NavigationService) {}

    onMenuNavigate(link:string) {
        
        var navItem = this.navService.getNavItemByLink(link);
        this.navService.onSelectNavItem(navItem);
        
        // for now, let's do it this way
        if (link === '/login'){
            var mainNavItem = this.navService.getNavItemByLink('/main/');
            this.navService.onSelectNavItem(mainNavItem);
        }

        this.router.navigate([link]);
    }
}