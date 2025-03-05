import { Injectable } from '@angular/core';
import { HeadersService } from '../token/headers.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = "/cart";

  constructor(private http: HttpClient, private headersService: HeadersService) {}

  addItemToCart(productId: number, quantity: number): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/add`, { productId, quantity }, { headers });
  }

  listItemsInCart(): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    console.log("Carrinho recebido do backend:", )
    return this.http.get(`${this.apiUrl}`, { headers }).pipe(
  );
  }

  removeItemFromCart(productId: number): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${productId}`, { headers });
  }

  buyItemsInCart(): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/buy`, {}, { headers });
  }

  updateCartItemQuantity(productId: number, quantity: number): Observable<any> {
    const headers = this.headersService.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/update`, { productId, quantity }, { headers })
  }
}
