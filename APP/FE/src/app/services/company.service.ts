import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  apiURL: string;

  constructor(private http: HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  getAllCompanies(params: any): Observable<any> {
    return this.http.get(`${this.apiURL}/getCompanies`,{params: params});
  }

  getCompany(companyName: any): Observable<any> {
    return this.http.get(`${this.apiURL}/getCompanies/${companyName}`);
  }

  addCompany(data:any): Observable<any> {
    return this.http.post(`${this.apiURL}/addCompany`,data);
  }
  
}
