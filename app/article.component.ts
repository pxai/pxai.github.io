import {Component} from "@angular/core";
import {OnInit} from '@angular/core'; // Part of the lifecycle hook
import {Article} from './article';
import {ArticleService} from './article.service';
import {ArticleDetailComponent} from './article-detail.component';
import { RouteParams } from '@angular/router-deprecated';
import { RouteConfig } from '@angular/router-deprecated';
import { Router } from '@angular/router-deprecated';
//import {LoginValidator} from "./login.validator";


// Optimal way to get just what we need:
// import {Observable} from "rxjs/Rx";
// import "rxjs/add/operator/filter";
// import "rxjs/add/operator/debounceTime";

/**
* Using a service to take care of the server interaction
*/
@Component({
    selector: "control-group",
    templateUrl: "app/partials/articles.template.html",
    // Other directives, injected
    directives: [ArticleDetailComponent],
    providers: [ArticleService]
})
@RouteConfig([
  {path: '/detail/:id', name: 'Detail', component: ArticleDetailComponent}
  ])
export class ArticleComponent  implements OnInit {
  private title: string = "Articles";
  public articles: Article[];
  private subscription: string = '';
  private _routeParams: RouteParams;
  private _router : Router;

  private _articleService : ArticleService;

  constructor(articleService: ArticleService,
                router: Router,
                routeParams: RouteParams) {
        this._articleService = articleService;
        this._router = router;
        this._routeParams = routeParams;
  }

  private getArticles () {
      this._articleService.getArticles().then(articles => this.articles = articles);
  }

  public ngOnInit() {
      this.getArticles();
  }

  public detail (article: Article) {
    console.log("article selected: " + article.id);
    let link = ['Detail', { id: article.id }];
    this._router.navigate(link);
}
}
