import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../token/headers.service';
import { Observable } from 'rxjs';
import { Client } from '../../interface/account/user';
import { Cart } from '../../interface/cart/cart-product';

@Injectable({
  providedIn: 'root'
})
export class AccountService { 
  private url = "/my"

  constructor(
    private http: HttpClient,
    private headersService: HeadersService,
  ) {}
 
  clientDetails(): Observable<Client> {
    const headers = this.headersService.getAuthHeaders()
    return this.http.get<Client>(`${this.url}/profile`, { headers })
  }

  updateDetails(client: Client): Observable<Client> {
    const headers = this.headersService.getAuthHeaders()
    return this.http.put<Client>(`${this.url}/details`, client, { headers })
  }

  cancelOrder(id: number): Observable<any> {
    const headers = this.headersService.getAuthHeaders()
    return this.http.put<any>(`${this.url}/orders/remove/${id}`, {}, { headers })
  }

  listAllOrders(): Observable<any[]> {
    const headers = this.headersService.getAuthHeaders()
    return this.http.get<any[]>(`${this.url}/orders`, { headers })
  }

  getOrderDetails(orderId: number): Observable<Cart[]> {
    const headers = this.headersService.getAuthHeaders()
    return this.http.get<Cart[]>(`${this.url}/orders/details/${orderId}`, { headers })
  }
}
