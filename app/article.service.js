System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var ArticleService, ARTICLES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * Changes in stage 2 - hero editor
            * Using a service to take care of the server interaction
            */
            ArticleService = (function () {
                function ArticleService() {
                    this.articles = ARTICLES;
                }
                /**
                 * returns all articles
                 * Check about promises: http://exploringjs.com/es6/ch_promises.html
                 */
                ArticleService.prototype.getArticles = function () {
                    return Promise.resolve(this.articles);
                };
                ArticleService.prototype.getArticle = function (id) {
                    return Promise.resolve(this.articles).then(function (articles) { return articles.filter(function (article) { return article.id === id; })[0]; });
                };
                /**
                 * The same with some latency added
                 */
                ArticleService.prototype.getArticlesLatency = function () {
                    var _this = this;
                    return new Promise(function (resolve) {
                        return setTimeout(function () { return resolve(_this.articles); }, 1000);
                    } // 1 second
                     // 1 second
                    );
                };
                /**
               * The same with some latency added
               */
                ArticleService.prototype.updateArticle = function (updatedArticle) {
                    return Promise.resolve(this.articles).then(function (articles) { return articles.filter(function (article) { return article.id === updatedArticle.id; })[0] = updatedArticle; });
                };
                /**
                * The same with some latency added
                */
                ArticleService.prototype.saveArticle = function (article) {
                    return Promise.resolve(this.articles).then(function (articles) { return articles.push(article); });
                };
                ArticleService.prototype.deleteArticle = function (id) {
                    var _this = this;
                    return Promise.resolve(this.articles).then(
                    //articles => articles.filter(article => article.id === id)[0] = null
                    function (articles) {
                        for (var i = 0; i < _this.articles.length; i++) {
                            if (_this.articles[i].id == id) {
                                _this.articles.splice(i, 1);
                            }
                        }
                    });
                };
                ArticleService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ArticleService);
                return ArticleService;
            }());
            exports_1("ArticleService", ArticleService);
            ARTICLES = [
                { id: '1', title: 'Finish this sample', content: 'bla bla', date: '', tags: ['hello'], visible: true },
                { id: '2', title: 'Prepare meal', content: 'bla bla', date: '', tags: ['hello'], visible: true },
                { id: '3', title: 'Play with friends', content: 'bla bla', date: '', tags: ['hello'], visible: true },
                { id: '4', title: 'Run to the hills', content: 'bla bla', date: '', tags: ['hello'], visible: true },
                { id: '5', title: 'Learn Ionic2', content: 'bla bla', date: '', tags: ['hello'], visible: true }
            ];
        }
    }
});
//# sourceMappingURL=article.service.js.map