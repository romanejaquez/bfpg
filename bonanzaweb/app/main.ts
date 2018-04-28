import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {DialogService} from './services/dialogservice.service';
import {ServiceProxy} from './services/serviceproxy.service';
import {NavigationService} from './services/navigation.service';
import {SplashScreenComponent} from './splashscreen.component';
import {ROUTER_PROVIDERS} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, DialogService, ServiceProxy, NavigationService]);
bootstrap(SplashScreenComponent);

