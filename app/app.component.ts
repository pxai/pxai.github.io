import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'
import {OldStyleAsyncSampleComponent} from './oldstyleasyncsample.component';
import {ObservableSampleComponent} from './observablesample.component';
import {PromiseSampleComponent} from './promisesample.component';
import {HttpSampleComponent} from './httpsample.component';

/**
 * Form samples
 */
// Different kinds of interpolation
// Notice textContent is a dom element
@Component({
    selector: 'server-app',
    directives: [ROUTER_DIRECTIVES],
    template: `<h1>{{title}}</h1>
                <nav>
                <ul>
                    <li><a [routerLink]="['OldStyleAsyncSample']">Old Style Async sample</a></li>
                    <li><a [routerLink]="['ObservableSample']">Observable sample</a></li>
                    <li><a [routerLink]="['PromiseSample']">Promise Sample</a></li>
                    <li><a [routerLink]="['HttpSample']">Http Sample</a></li>
                </ul>
                </nav>
                <router-outlet></router-outlet>`
})
@RouteConfig([
  {path: '/oldstyleasyncsample', name: 'OldStyleAsyncSample', component: OldStyleAsyncSampleComponent},
  {path: '/observablesample', name: 'ObservableSample', component: ObservableSampleComponent},
  {path: '/promisesample', name: 'PromiseSample', component: PromiseSampleComponent},
  {path: '/httpsample', name: 'HttpSample', component: HttpSampleComponent}
  ])
export class AppComponent {
    private title: string = 'Server samples';
}
