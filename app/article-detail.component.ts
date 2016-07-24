import {Component,  OnInit } from "@angular/core";
import {RouteParams} from '@angular/router-deprecated';
import {Article} from "./article";
import { ArticleService } from './article.service';

/**
 * Changes in stage 3 - hero editor
* Using a service to take care of the server interaction
*/
@Component({
    selector: "article-detail",
    template: `<div *ngIf="article">
                    <h2>{{article.title  | uppercase }}</h2>
                    <div>Id: {{article.id}}</div>
                    <div>Done: {{article.content}}</div>
                    <button (click)="edit(article)">Edit</button>
                    <button (click)="delete(article)">Delete</button>
               </div>
               <a href="" (click)="goBack(e)">Back</a>`,
    providers: [ArticleService]
})
export class ArticleDetailComponent implements OnInit {
    //@Input()
    // We will no longer receive the task in a parent component property binding
    public article : Article;
    private _articleService: ArticleService;
    private _routeParams: RouteParams;

    public constructor (  articleService: ArticleService,
                          routeParams: RouteParams) {
        this._articleService = articleService;
        this._routeParams = routeParams;

    }

    public ngOnInit () {
        let id = this._routeParams.get('id');
        this._articleService.getArticle(id)
            .then(article => this.article = article);
    }

    public goBack(e) {
        window.history.back();
    }
}
