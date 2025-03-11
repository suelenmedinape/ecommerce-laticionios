import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor(private cookieService: CookieService) {}

  getAuthToken(): string {
    return this.cookieService.get('auth_token');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return headers;
  }
}
