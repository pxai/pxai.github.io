import {Component} from "@angular/core";
import {OnInit} from '@angular/core'; // Part of the lifecycle hook
import {ArticleService} from './article.service';
import {ArticleDetailComponent} from './article-detail.component';
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
export class ArticleComponent  implements OnInit {
  private title: string = "Articles";
  public articles;
  private subscription: string = '';

  private _articleService : ArticleService;

  constructor(articleService: ArticleService) {
      this._articleService = articleService;
  }

  private getArticles () {
      this._articleService.getArticles().then(articles => this.articles = articles);
  }

  public ngOnInit() {
      this.getArticles();
  }
}
