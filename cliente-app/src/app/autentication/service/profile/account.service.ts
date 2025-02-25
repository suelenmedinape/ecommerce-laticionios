import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AccountDetails } from '../../interface/account-details';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = "/profile";

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getAccountDetails(params?: { [key: string]: string }): Observable<AccountDetails> {
    const token = this.cookieService.get("auth_token");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    console.log('Token no getAccountDetails:', token); 
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http.get<AccountDetails>(this.apiUrl, { headers, params: httpParams });
  }
}
