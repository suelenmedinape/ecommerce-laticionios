import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = '/products'; // URL do backend

  constructor(private http: HttpClient) {}
 
  getProdutos(): Observable<any> {
    return this.http.get(this.apiUrl); 
  }

  getProdutoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getProdutoByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?name=${name}`);
  }
}
