System.register(['angular2/core', 'angular2/router', './oldstyleasyncsample.component', './observablesample.component', './promisesample.component', './httpsample.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, oldstyleasyncsample_component_1, observablesample_component_1, promisesample_component_1, httpsample_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (oldstyleasyncsample_component_1_1) {
                oldstyleasyncsample_component_1 = oldstyleasyncsample_component_1_1;
            },
            function (observablesample_component_1_1) {
                observablesample_component_1 = observablesample_component_1_1;
            },
            function (promisesample_component_1_1) {
                promisesample_component_1 = promisesample_component_1_1;
            },
            function (httpsample_component_1_1) {
                httpsample_component_1 = httpsample_component_1_1;
            }],
        execute: function() {
            /**
             * Form samples
             */
            // Different kinds of interpolation
            // Notice textContent is a dom element
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Server samples';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'server-app',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        template: "<h1>{{title}}</h1>\n                <nav>\n                <ul>\n                    <li><a [routerLink]=\"['OldStyleAsyncSample']\">Old Style Async sample</a></li>\n                    <li><a [routerLink]=\"['ObservableSample']\">Observable sample</a></li>\n                    <li><a [routerLink]=\"['PromiseSample']\">Promise Sample</a></li>\n                    <li><a [routerLink]=\"['HttpSample']\">Http Sample</a></li>\n                </ul>\n                </nav>\n                <router-outlet></router-outlet>"
                    }),
                    router_1.RouteConfig([
                        { path: '/oldstyleasyncsample', name: 'OldStyleAsyncSample', component: oldstyleasyncsample_component_1.OldStyleAsyncSampleComponent },
                        { path: '/observablesample', name: 'ObservableSample', component: observablesample_component_1.ObservableSampleComponent },
                        { path: '/promisesample', name: 'PromiseSample', component: promisesample_component_1.PromiseSampleComponent },
                        { path: '/httpsample', name: 'HttpSample', component: httpsample_component_1.HttpSampleComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map