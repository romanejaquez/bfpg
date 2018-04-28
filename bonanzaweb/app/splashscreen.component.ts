import {Component} from '@angular/core';

@Component({
    selector: 'splash-screen',
    templateUrl: 'app/views/splash.html'
})
export class SplashScreenComponent {
    
    constructor() {
        
        setTimeout(() => {
            this.onDoneLoadingResources();
        }, 2000);
    }
    
    onDoneLoadingResources() {
        
        $(".splashScreen").remove();
    }
}