import { Login } from './../model/login';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from '../interfaces/environment-config.interface';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string;
  private returnedUser = new User('', '');
  currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private http: HttpClient) {
    this.apiUrl = `${config.environment.baseUrl}`;
  }

  loginUser(loginModel: Login) {
     return this.http.post(this.apiUrl + 'account/login', loginModel).pipe(
       map((data: User) => {
           this.returnedUser.userName = data.userName;
           this.returnedUser.token = data.token;
           console.log(this.returnedUser.userName);
           console.log(this.returnedUser.token);
           if (this.returnedUser.userName.length > 0 && this.returnedUser.userName.length)
           {
             localStorage.setItem('loggedInUser', JSON.stringify(this.returnedUser));
             this.currentUserSource.next(this.returnedUser);
           }
           return this.returnedUser;
       })
     );
  }

  registerUser(loginModel: Login) {
    return this.http.post(this.apiUrl + 'account/register', loginModel).pipe(
      map((data: User) => {
          this.returnedUser.userName = data.userName;
          this.returnedUser.token = data.token;
          console.log(this.returnedUser.userName);
          console.log(this.returnedUser.token);
          if (this.returnedUser.userName.length > 0 && this.returnedUser.userName.length)
          {
            localStorage.setItem('loggedInUser', JSON.stringify(this.returnedUser));
            this.currentUserSource.next(this.returnedUser);
          }
          this.setCurrentUser(this.returnedUser);
          return this.returnedUser;
      })
    );
 }


  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logoutUser() {
    localStorage.removeItem('loggedInUser');
    this.currentUserSource.next(null);
  }

}
