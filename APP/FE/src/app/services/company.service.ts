import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiURL: string;
  constructor(private httpClient : HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  getAllCompanies(params: any): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/getCompanies`,{params: params});
  }

  getCompany(companyName: any): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/getCompan`,);
  }
}
