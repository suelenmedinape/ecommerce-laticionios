import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../token/headers.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = '/orders';

  constructor(private http: HttpClient, private headerService: HeadersService) { }

  listOrders(): any {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get(this.apiUrl, { headers });
  }

  updateStatus(id: number, status: string): any {
    const headers = this.headerService.getAuthHeaders();

    status = status.toLowerCase();

    return this.http.put(`${this.apiUrl}/${id}?status=${encodeURIComponent(status)}`, {}, { headers });
  }

  filterByStatus(status: string): Observable<any[]> {
    const headers = this.headerService.getAuthHeaders();
    status = status.toLowerCase();
    return this.http.get<any[]>(`${this.apiUrl}/status?status=${encodeURIComponent(status)}`, { headers });
  }

  findOrderById(id: number): any {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }
}
