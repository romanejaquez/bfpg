"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var dialogservice_service_1 = require('./services/dialogservice.service');
var serviceproxy_service_1 = require('./services/serviceproxy.service');
var navigation_service_1 = require('./services/navigation.service');
var splashscreen_component_1 = require('./splashscreen.component');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, dialogservice_service_1.DialogService, serviceproxy_service_1.ServiceProxy, navigation_service_1.NavigationService]);
platform_browser_dynamic_1.bootstrap(splashscreen_component_1.SplashScreenComponent);
//# sourceMappingURL=main.js.map