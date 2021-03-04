import { ENV_CONFIG, EnvironmentConfig } from './../../interfaces/environment-config.interface';
import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  private apiUrl: string;

  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private http: HttpClient) {
    this.apiUrl = `${config.environment.baseUrl}`;
  }

  ngOnInit() : void {
  }

  get400Error() {
    this.http.get(this.apiUrl + 'bug/bad-request').subscribe(response => {
      console.log(response);
    }, error =>{
      console.log(error);
    });
  }

  get400ValidationError() {
    this.http.get(this.apiUrl + 'account/register').subscribe(response => {
      console.log(response);
    }, error =>{
      console.log(error);
    });
  }
  
  get401Error() {
    this.http.get(this.apiUrl + 'bug/auth').subscribe(response => {
      console.log(response);
    }, error =>{
      console.log(error);
    });
  }

  get404Error() {
    this.http.get(this.apiUrl + 'bug/not-found').subscribe(response => {
      console.log(response);
    }, error =>{
      console.log(error);
    });
  }

  get500Error() {
    this.http.get(this.apiUrl + 'bug/server-error').subscribe(response => {
      console.log(response);
    }, error =>{
      console.log(error);
    });
  }

}
