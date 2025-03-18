import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BestSellers } from '../../interface/products/best-sellers';
import { HeadersService } from '../token/headers.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = '/products'; // URL do backend
  private api = '/dashboard';

  constructor(private http: HttpClient, private headerService: HeadersService) {}
 
  getProdutos(): Observable<any> {
    return this.http.get(this.apiUrl); 
  }

  getProdutoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getProdutoByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?name=${name}`);
  }

  getBestSellerProducts(): Observable<BestSellers[]> {
    return this.http.get<BestSellers[]>(`${this.api}/products/best-sellers`);
  }

  listProductsByCategory(category: string): Observable<any> {
    const headers = this.headerService.getAuthHeaders()
    return this.http.get<any>(`${this.apiUrl}/list?category=${encodeURIComponent(category)}`, { headers })
  }

  listCategories(): Observable<any> {
    const headers = this.headerService.getAuthHeaders()
    return this.http.get<any>(`${this.apiUrl}/list-categories`, { headers })
  }
}
