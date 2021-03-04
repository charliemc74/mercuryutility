import { PPmSummary } from './../model/ppmsummary';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from '../interfaces/environment-config.interface';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PpmDetailsService {

  private apiUrl: string;
  
  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private httpClient: HttpClient) {
    this.apiUrl = `${config.environment.baseUrl}`;
  }

  getPPMs(): Observable<PPmSummary[]> {
    return this.httpClient.get<PPmSummary[]>(this.apiUrl + 'ppm/ppms');
  }

  getPPMById(id: string): Observable<PPmSummary> {
    return this.httpClient.get<PPmSummary>(this.apiUrl + 'ppm/?id=' + id);
  }
}