import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = "/cart"

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  addToCart(productId: number, quantity: number): Observable<any> {
    const token = this.cookieService.get("auth_token");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    console.log("Token no addToCart:", token)
    return this.http.post(`${this.apiUrl}/add`, { productId, quantity }, { headers })
  }

  listCart(): Observable<any> {
    const token = this.cookieService.get("auth_token");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}`, { headers })
  }

  updateCartItem(data: { productId: number; quantity: number }): Observable<any> {
    const { productId, quantity } = data;
    const token = this.cookieService.get("auth_token");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    console.log("Token no updateCartItem:", token);
    console.log("Produto e quantidade:", productId, quantity);
    return this.http.put(`${this.apiUrl}/update`, { productId, quantity }, { headers }).pipe(
      catchError((error) => {
        console.error('Erro ao atualizar item:', error);
        return throwError(() => new Error('Erro ao atualizar o carrinho'));
      })
    );
  }

  removeItem(productId: number): Observable<any> {
    const token = this.cookieService.get("auth_token");
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    console.log("Token no removeItem:", token);
    console.log("Produto a ser removido:", productId);
    return this.http.delete(`${this.apiUrl}/${productId}`, { headers });
  }

  buyCart(): Observable<any> {
    const token = this.cookieService.get("auth_token");
    console.log("Token being sent:", token);
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/buy`, {}, { headers }).pipe(
      tap(
        response => console.log('Response:', response),
        error => console.error('Error:', error)
      )
    );
  }
}
