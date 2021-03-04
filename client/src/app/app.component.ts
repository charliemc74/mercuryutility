import { LoginService } from './services/login.service';
import { HttpClient } from '@angular/common/http';
import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { User } from './model/user';
import { Login } from './model/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Mercury Utilities';
  users: any;

  constructor(private http: HttpClient, private loginService: LoginService)
  {
  }

  ngOnInit(): void {   
    this.setCurrentUser();
  }

  setCurrentUser()
  {
    const user: User = JSON.parse(localStorage.getItem('loggedInUser'));
    this.loginService.setCurrentUser(user);
  }
  
  registerComplete(event: Login)
  {
    console.log('AppCompnent Registration Complete: ' + event.username);
    this.setCurrentUser();
  }


}
