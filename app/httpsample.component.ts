import {Component} from "angular2/core";
import {Control, ControlGroup, Validators, FormBuilder} from "angular2/common";
import {LoginValidator} from "./login.validator";


// Optimal way to get just what we need:
// import {Observable} from "rxjs/Rx";
// import "rxjs/add/operator/filter";
// import "rxjs/add/operator/debounceTime";

/**
* Using a service to take care of the server interaction
*/
@Component({
    selector: "control-group",
    templateUrl: "app/httpsample.template.html",
})
export class HttpSampleComponent {
  private title: string = "Simple form with Observable async query";
  public users =  [{id: 1, username: 'esnowden', email: 'ed@kgb.ru'},
              {id: 2, username: 'jassange', email: 'julian@gob.pe'}];
  public form: ControlGroup;
  private subscription;

   constructor (formBuilder: FormBuilder) {

     this.form = formBuilder.group({
       login: ["", Validators.required]
     });

   }


   /**
   * async call to server to check wether user exists
   */
   public checkLogin (login) {


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
