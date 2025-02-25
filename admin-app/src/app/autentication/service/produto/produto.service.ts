import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = '/products'; 

  constructor(private http: HttpClient, private cookieService: CookieService) {}
 
  getProdutos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/info-product-admin`); 
  }

  addProduct(product: any): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    console.log("Token no addProduct:", token);
    return this.http.post(this.apiUrl, product, {headers});
  }

  getProdutoByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?name=${name}`);
  }

  deleteProduct(id: number): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    console.log("Token no addProduct:", token);
    return this.http.delete(`${this.apiUrl}/${id}`, {headers});
  }

  editProduct(product: any): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    console.log("Token no addProduct:", token);
    return this.http.put(`${this.apiUrl}/${product.id}`, product, {headers});
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
