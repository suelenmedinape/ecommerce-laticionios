import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../token/headers.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = '/products';

  constructor(private http: HttpClient, private headerService: HeadersService) { }

  listProductsByCategory(category: string): Observable<any> {
    const headers = this.headerService.getAuthHeaders()
    return this.http.get<any>(`${this.apiUrl}/list?category=${encodeURIComponent(category)}`, { headers })
  }

  listCategories(): Observable<any> {
    const headers = this.headerService.getAuthHeaders()
    return this.http.get<any>(`${this.apiUrl}/list-categories`, { headers })
  }
}
