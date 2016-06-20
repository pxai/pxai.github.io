import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated'
//import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router'
//import {OldStyleAsyncSampleComponent} from './oldstyleasyncsample.component';
//import {ObservableSampleComponent} from './observablesample.component';
//import {PromiseSampleComponent} from './promisesample.component';
import {HttpSampleComponent} from './httpsample.component';

/**
 * Form samples
 */
// Different kinds of interpolation
// Notice textContent is a dom element
@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES],
    template: `<h1>{{title}}</h1>
                <nav>
                <ul>
                    <li><a [routerLink]="['HttpSample']">Http Sample</a></li>
                </ul>
                </nav>
                <router-outlet></router-outlet>`
})
@RouteConfig([
  {path: '/httpsample', name: 'HttpSample', component: HttpSampleComponent}
  ])
export class AppComponent {
    private title: string = 'Server samples';
}

