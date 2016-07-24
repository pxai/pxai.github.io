import {Injectable} from  '@angular/core';
import {Article} from "./article";


/**
 * Changes in stage 2 - hero editor
* Using a service to take care of the server interaction
*/

@Injectable()
export class ArticleService {
  private articles: Article[] = ARTICLES;

  /**
   * returns all articles
   * Check about promises: http://exploringjs.com/es6/ch_promises.html
   */
  public getArticles() {
      return Promise.resolve(this.articles);
  }

  public getArticle(id: string) {
    return Promise.resolve(this.articles).then(
        articles => articles.filter(article => article.id === id)[0]
    );
  }

  /**
   * The same with some latency added
   */
  getArticlesLatency() {
    return new Promise<Article[]>(resolve =>
      setTimeout(()=>resolve(this.articles), 1000) // 1 second
    );
  }

    /**
   * The same with some latency added
   */
  updateArticle (updatedArticle: Article) {
    return Promise.resolve(this.articles).then(
        articles => articles.filter(article => article.id === updatedArticle.id)[0] = updatedArticle
    );
  }

   /**
   * The same with some latency added
   */
  saveArticle (article: Article) {
    return Promise.resolve(this.articles).then(
        articles => articles.push(article)
    );
  }

   public deleteArticle(id: string) {
    return Promise.resolve(this.articles).then(
        //articles => articles.filter(article => article.id === id)[0] = null
        articles => {
            for (var i = 0; i < this.articles.length; i++) {
                if (this.articles[i].id == id) {
                    this.articles.splice(i,1);
                }
            }
        }
    );
  }
}

var ARTICLES: Article[] = [
      {id: '1', title: 'Finish this sample',content: 'bla bla', date: '', tags: ['hello'], visible: true},
      {id: '2', title: 'Prepare meal',content: 'bla bla', date: '', tags: ['hello'], visible: true},
      {id: '3', title: 'Play with friends',content: 'bla bla', date: '', tags: ['hello'], visible: true},
      {id: '4', title: 'Run to the hills',content: 'bla bla', date: '', tags: ['hello'], visible: true},
      {id: '5', title: 'Learn Ionic2',content: 'bla bla', date: '', tags: ['hello'], visible: true}
];
