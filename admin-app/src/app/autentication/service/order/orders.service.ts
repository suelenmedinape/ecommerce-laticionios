import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService implements OnInit{
  private apiUrl = '/orders';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.listOrders();
  }

  listOrders(): any {
    const token = this.cookieService.get('auth_token');
        const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get(this.apiUrl, {headers});
  }
}
