import {Injectable} from '@angular/core';
import {NavigationItem} from '../models/navitem.model';
import {User} from '../models/user.model';

@Injectable()
export class NavigationService {
 
    Navigation = { MainOptions: new Array<NavigationItem>(), AdditionalOptions: new Array<NavigationItem>() };
    User:User;
    constructor() {
        
        // inicio
        this.Navigation.MainOptions.push(new NavigationItem(
            "Inicio",
            "/main/",
            "home",
            0,
            true,
            true
        ));
        
        // clientes
        this.Navigation.MainOptions.push(new NavigationItem(
            "Afiliados",
            "/main/afiliados",
            "group",
            0,
            true,
            false
        ));
        
        // pagos
        this.Navigation.MainOptions.push(new NavigationItem(
            "Pagos",
            "/main/pagos",
            "dollar",
            0,
            true,
            false
        ));
        
        // anotaciones
        this.Navigation.MainOptions.push(new NavigationItem(
            "Anotaciones",
            "/main/anotaciones",
            "document",
            0,
            true,
            false
        ));
        
        // opciones adicionales
        // notificaciones
        this.Navigation.AdditionalOptions.push(new NavigationItem(
            "Notificaciones",
            "/main/notificaciones",
            "bell",
            0,
            true,
            false
        ));
        
        // reportes
        this.Navigation.AdditionalOptions.push(new NavigationItem(
            "Reportes",
            "/main/reportes",
            "bar-chart",
            0,
            true,
            false
        ));
        
        // ajustes
        this.Navigation.AdditionalOptions.push(new NavigationItem(
            "Ajustes",
            "/main/ajustes",
            "cog-gear",
            0,
            true,
            false
        ));
        
        // ayuda
        this.Navigation.AdditionalOptions.push(new NavigationItem(
            "Ayuda",
            "/main/ayuda",
            "question-1",
            0,
            true,
            false
        ));
    }
    
    onSelectNavItem(selectedNavItem:NavigationItem) {
        
        // loop through the options
        var allItems = this.Navigation.MainOptions.concat(this.Navigation.AdditionalOptions);
        
        allItems.forEach((navItem: NavigationItem, index: number) => {
            navItem.IsSelected = selectedNavItem != null && selectedNavItem.Label === navItem.Label;
        });
    }
    
    onSelectNavItemByLink(link:string) {
        
        var navItem = this.getNavItemByLink(link);
        this.onSelectNavItem(navItem);
    }
    
    getNavItemByLink(link:string) {
        
        var item:NavigationItem  = null;
        
        // loop through the options
        var allItems = this.Navigation.MainOptions.concat(this.Navigation.AdditionalOptions);
        
        for(var i = 0; i < allItems.length; i++) {
            if (allItems[i].Path === link) {
                item = allItems[i];
                break;
            }
        }
        
        return item;
    }
}