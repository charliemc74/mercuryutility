import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../model/login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();
  loginModel = new Login('', '');

  constructor(private loginService: LoginService,  private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.loginService.registerUser(this.loginModel).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/ppmsummary');
    }, error => {
      console.log(error);
      this.router.navigateByUrl('/');
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
  
}
