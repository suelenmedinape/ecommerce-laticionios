import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: "root",
})
export class AccountService {
  private url = "/profile"

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAccountDetails(): Observable<any> {
    const token = this.cookieService.get("auth_token");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get(this.url, {headers});
  }

  updateAccountDetails(clientUpdateDTO: any): Observable<any> {
    const token = this.cookieService.get("auth_token"); // Obtém o token do cookie
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
  
    return this.http.put(this.url, clientUpdateDTO, { headers });
  }
}
