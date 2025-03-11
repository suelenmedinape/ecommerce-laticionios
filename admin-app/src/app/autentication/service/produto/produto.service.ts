import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HeadersService } from '../token/headers.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = '/products'; 

  constructor(private http: HttpClient, private headerService: HeadersService) {}
 
  getProdutos(): Observable<any> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/info-product-admin`, {headers}); 
  }

  deleteProduct(id: number): Observable<any> {
    const headers = this.headerService.getAuthHeaders();
    console.log('id', id);
    return this.http.delete(`${this.apiUrl}/${id}`, {headers});
  }

  addProduct(product: any): Observable<any> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.post(this.apiUrl, product, {headers});
  }

  getProdutoByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?name=${name}`);
  }

  editProduct(product: any): Observable<any> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${product.id}`, product, {headers});
  }

  getProductById(id: number): Observable<any> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${id}`, {headers});
  }
}
