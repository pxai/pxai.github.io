import {Component} from "@angular/core";
import {Control, ControlGroup, Validators, FormBuilder} from "@angular/common";
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
  private title: string = "Simple form with Observable async query";
  public articles =  [{id: 1, title: 'esnowden', text: 'ed@kgb.ru'},
              {id: 2, title: 'jassange', text: 'julian@gob.pe'}];
  public form: ControlGroup;
  private subscription: string = '';

   constructor (formBuilder: FormBuilder) {

     this.form = formBuilder.group({
       login: ["", Validators.required]
     });

   }


   /**
   * async call to server to check wether user exists
   */
   public checkLogin (login='') {


   }

    public signup () {
      if (this.form.find("login").value === "admin" ) {
        this.form.find("login").setErrors({
          loginExists: true
        });
      }

       console.log("Sending form");
        console.log(this.form.value);
    }
}



