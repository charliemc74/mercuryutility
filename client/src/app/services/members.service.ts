import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from '../interfaces/environment-config.interface';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Member } from '../model/member';

const httpOptions  = {
  headers: new HttpHeaders ({
    Authorization : 'Bearer ' + JSON.parse(localStorage.getItem('loggedInUser'))?.token
  })
};

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private apiUrl: string;
  
  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private httpClient: HttpClient) {
    this.apiUrl = `${config.environment.baseUrl}`;
  }

  getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.apiUrl + 'users/users');
  }

  getMember(username: string): Observable<Member> {
    return this.httpClient.get<Member>(this.apiUrl + 'users/' + username);
  }

}
