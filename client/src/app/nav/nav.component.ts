import { LoginService } from './../services/login.service';
import { Login } from './../model/login';
import { Component, OnInit, Input } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  @Input() registeredUser: Login;
  loginModel = new Login('', '');
  
  constructor(public loginService: LoginService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {    
    this.getCurrentUser();
  }

  login()
  {
    this.loginService.loginUser(this.loginModel).subscribe(response => {
      console.log(response);
      this.toastr.success('Login Successful!');
      this.router.navigateByUrl('/ppmsummary');
    },
      error => {
        console.log(error);
        this.toastr.error(error.error);
        this.router.navigateByUrl('/');
    });
  }

  logout() {
     this.loginService.logoutUser();
     this.loginModel.username = '';
     this.loginModel.password = '';
     this.toastr.success('Logout successful');
     this.router.navigateByUrl('/');
  }

  getCurrentUser(){
    this.loginService.currentUser$.subscribe(user => {
      this.loginModel.username = user.userName;
    }, error => {
      console.log(error);
    });
  }

  updateUser()
  {
    this.getCurrentUser();
  }

}
