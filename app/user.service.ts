import {Http} from "angular2/http";
import "rxjs/add/operator/map";
/**
* http gets injected through the constructor argument
*
*/
export class UserService {
  private http: Http;
  constructor (http: Http) {
    this.http = http;
  }

  public getUsers() {
    // we subscribe to an observable, when data is ready
    // we push data to the component. this will be a consumer

    // We expose only data using map operator, that must be imported
      return this.http.get("http://localhost:3000/api/users/")
      .map(result => result.json());
    }

  public save() {
    this.http.put("http://localhost:3000/api/user/save","");
  }

  public update() {
    this.http.put("http://localhost:3000/api/user/update","");
  }

  public delete() {
    this.http.put("http://localhost:3000/api/user/delete/","");
  }

}
