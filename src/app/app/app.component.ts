
import { Component} from '@angular/core';
import { Headers, Http } from '@angular/http';
import './../../assets/css/styles.css';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  message;
  header = "Content-Type: application/json"
  constructor(private http: Http){

  }
  froapi(){
    this.message = { text: "notthing yet"}
    this.http.post(
      'https://froapi.appspot.com/_ah/api/echo/v1/echo',
      {"content":"Hello world!"})
.toPromise()
    .then(res =>
      console.log("res" , res )
  )
    console.log("Message:   ",this.message)
  }
 }
