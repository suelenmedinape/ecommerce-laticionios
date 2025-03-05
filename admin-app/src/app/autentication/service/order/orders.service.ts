import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = '/orders';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  listOrders(): any {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get(this.apiUrl, { headers });
  }

  updateStatus(id: number, status: string): any {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    status = status.toLowerCase()

    return this.http.put(`${this.apiUrl}/${id}?status=${status}`, {}, { headers });
  }
}
