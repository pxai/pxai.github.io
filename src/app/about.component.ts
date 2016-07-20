import {Component} from "@angular/core";


/**
* Using a service to take care of the server interaction
*/
@Component({
    selector: "about",
    templateUrl: "app/about.template.html"
})
export class AboutComponent {
  public title: string = "@copy; pello.io - 2016";

}



