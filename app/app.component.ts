import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated'
import {AboutComponent} from './about.component';
import {HttpSampleComponent} from './httpsample.component';
import {ArticleComponent} from './article.component';

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
                    <li><a [routerLink]="['Article']">Last Articles</a></li>
                    <li><a [routerLink]="['HttpSample']">Http Sample</a></li>
                    <li><a [routerLink]="['About']">About</a></li>
                </ul>
                </nav>
                <router-outlet></router-outlet>`
})
@RouteConfig([
  {path: '/article', name: 'Article', component: ArticleComponent},
  {path: '/httpsample', name: 'HttpSample', component: HttpSampleComponent},
  {path: '/about', name: 'About', component: AboutComponent}
  ])
export class AppComponent {
    private title: string = 'pello.io';
}

