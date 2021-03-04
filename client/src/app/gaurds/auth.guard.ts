import { map } from 'rxjs/operators';
import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private toastr: ToastrService) {}

  canActivate(): Observable<boolean>  {
    return this.loginService.currentUser$.pipe(
      map(user => {
        if (user){
          return true;
        }else{
          this.toastr.error('You dont have access to this page - please contact Administrator');
        }
      })
    );
  }
  
}
