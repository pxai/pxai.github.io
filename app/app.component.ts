import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AboutComponent} from './about.component';
import {ArticleComponent} from './article.component';


@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/partials/home.template.html'
})
@RouteConfig([
  {path: '/article', name: 'Article', component: ArticleComponent},
  {path: '/about', name: 'About', component: AboutComponent}
  ])
export class AppComponent {
    private title: string = 'pello.io';
}
