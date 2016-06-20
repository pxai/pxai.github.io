"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var about_component_1 = require('./about.component');
var httpsample_component_1 = require('./httpsample.component');
/**
 * Form samples
 */
// Different kinds of interpolation
// Notice textContent is a dom element
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'pello.io';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            template: "<h1>{{title}}</h1>\n                <nav>\n                <ul>\n                    <li><a [routerLink]=\"['HttpSample']\">Http Sample</a></li>\n                    <li><a [routerLink]=\"['About']\">About</a></li>\n                </ul>\n                </nav>\n                <router-outlet></router-outlet>"
        }),
        router_deprecated_1.RouteConfig([
            { path: '/httpsample', name: 'HttpSample', component: httpsample_component_1.HttpSampleComponent },
            { path: '/about', name: 'About', component: about_component_1.AboutComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map