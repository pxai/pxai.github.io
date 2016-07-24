System.register(["@angular/core", '@angular/router-deprecated', './article.service'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, article_service_1;
    var ArticleDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (article_service_1_1) {
                article_service_1 = article_service_1_1;
            }],
        execute: function() {
            /**
             * Changes in stage 3 - hero editor
            * Using a service to take care of the server interaction
            */
            ArticleDetailComponent = (function () {
                function ArticleDetailComponent(articleService, routeParams) {
                    this._articleService = articleService;
                    this._routeParams = routeParams;
                }
                ArticleDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = this._routeParams.get('id');
                    this._articleService.getArticle(id)
                        .then(function (article) { return _this.article = article; });
                };
                ArticleDetailComponent.prototype.goBack = function (e) {
                    window.history.back();
                };
                ArticleDetailComponent = __decorate([
                    core_1.Component({
                        selector: "article-detail",
                        template: "<div *ngIf=\"article\">\n                    <h2>{{article.title  | uppercase }}</h2>\n                    <div>Id: {{article.id}}</div>\n                    <div>Done: {{article.content}}</div>\n                    <button (click)=\"edit(article)\">Edit</button>\n                    <button (click)=\"delete(article)\">Delete</button>\n               </div>\n               <a href=\"\" (click)=\"goBack(e)\">Back</a>",
                        providers: [article_service_1.ArticleService]
                    }), 
                    __metadata('design:paramtypes', [article_service_1.ArticleService, router_deprecated_1.RouteParams])
                ], ArticleDetailComponent);
                return ArticleDetailComponent;
            }());
            exports_1("ArticleDetailComponent", ArticleDetailComponent);
        }
    }
});
//# sourceMappingURL=article-detail.component.js.map