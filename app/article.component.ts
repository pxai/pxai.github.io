import {Component} from "@angular/core";
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
    templateUrl: "app/articles.template.html",
})
export class ArticleComponent {
  private title: string = "Articles";
  public articles =  [{id: 1, title: 'Snowden', text: 'ed@kgb.ru'},
              {id: 2, title: 'jassange', text: 'julian@gob.pe'}];
  private subscription: string = '';

   /*constructor () {
   }*/


}
