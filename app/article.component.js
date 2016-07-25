System.register(["@angular/core", './article.service', './article-detail.component', '@angular/router-deprecated'], function(exports_1, context_1) {
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
    var core_1, article_service_1, article_detail_component_1, router_deprecated_1, router_deprecated_2, router_deprecated_3;
    var ArticleComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (article_service_1_1) {
                article_service_1 = article_service_1_1;
            },
            function (article_detail_component_1_1) {
                article_detail_component_1 = article_detail_component_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
                router_deprecated_2 = router_deprecated_1_1;
                router_deprecated_3 = router_deprecated_1_1;
            }],
        execute: function() {
            //import {LoginValidator} from "./login.validator";
            // Optimal way to get just what we need:
            // import {Observable} from "rxjs/Rx";
            // import "rxjs/add/operator/filter";
            // import "rxjs/add/operator/debounceTime";
            /**
            * Using a service to take care of the server interaction
            */
            ArticleComponent = (function () {
                function ArticleComponent(articleService, router, routeParams) {
                    this.title = "Articles";
                    this.subscription = '';
                    this._articleService = articleService;
                    this._router = router;
                    this._routeParams = routeParams;
                }
                ArticleComponent.prototype.getArticles = function () {
                    var _this = this;
                    this._articleService.getArticles().then(function (articles) { return _this.articles = articles; });
                };
                ArticleComponent.prototype.ngOnInit = function () {
                    this.getArticles();
                };
                ArticleComponent.prototype.detail = function (article) {
                    console.log("article selected: " + article.id);
                    var link = ['Detail', { id: article.id }];
                    this._router.navigate(link);
                };
                ArticleComponent = __decorate([
                    core_1.Component({
                        selector: "control-group",
                        templateUrl: "app/partials/articles.template.html",
                        // Other directives, injected
                        directives: [article_detail_component_1.ArticleDetailComponent],
                        providers: [article_service_1.ArticleService]
                    }),
                    router_deprecated_2.RouteConfig([
                        { path: '/detail/:id', name: 'Detail', component: article_detail_component_1.ArticleDetailComponent }
                    ]), 
                    __metadata('design:paramtypes', [article_service_1.ArticleService, router_deprecated_3.Router, router_deprecated_1.RouteParams])
                ], ArticleComponent);
                return ArticleComponent;
            }());
            exports_1("ArticleComponent", ArticleComponent);
        }
    }
});
//# sourceMappingURL=article.component.js.map