import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../token/headers.service';
import { delay, map, Observable, of } from 'rxjs';
import { Dashboard } from '../../interface/dashboard';
import { MonthComparisonResponse } from '../../interface/month-data';
import { BestWorts } from '../../interface/best-worts';
import { Product } from '../../interface/product';

interface StatusDataResponse {
  months: string[];
  status: Array<{
    name: string;
    data: number[];
  }>;
}

interface StatusData {
  data: number[];
  name: string;
  status: Array<{
    name: string;
    data: number[];
  }>;
  mes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = '/dashboard';

  constructor(private http: HttpClient, private headerService: HeadersService) { }

  getCompletedOrdersInTheMonth(): Observable<Dashboard> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get<Dashboard>(`${this.apiUrl}/orders/current-month`, { headers });
  }

  getTotalSales(): Observable<Dashboard> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get<Dashboard>(`${this.apiUrl}/orders/total-revenue`, { headers });
  }

  getStatusData(): Observable<StatusData> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get<StatusDataResponse>(`${this.apiUrl}/orders/status-summary`, { headers }).pipe(
      map(response => ({
        status: response.status,
        mes: response.months,
        data: [], 
        name: '' 
      })),
      delay(500) 
    );
  }

  getLowStockProducts(): Observable<Product[]> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get<Product[]>(`${this.apiUrl}/products/low-stock`, { headers }); 
  }

  getValueLowStockProducts(value: number): Observable<Product[]> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get<Product[]>(`${this.apiUrl}/products/low-stock?quantity=${value}`, { headers }); 
  }

  getTotalRevenue(startDate: Date, endDate: Date): Observable<Dashboard> {
    const headers = this.headerService.getAuthHeaders()

    // Format dates to YYYY-MM-DD
    const formattedStartDate = startDate.toISOString().split("T")[0]
    const formattedEndDate = endDate.toISOString().split("T")[0]

    return this.http.get<Dashboard>(
      `${this.apiUrl}/orders/total-revenue/count?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
      { headers },
    )
  }

  getTotalRevenueToday(startDate: Date, endDate: Date): Observable<Dashboard> {
    const headers = this.headerService.getAuthHeaders()

    // Format dates to YYYY-MM-DD
    const formattedStartDate = startDate.toISOString().split("T")[0]
    const formattedEndDate = endDate.toISOString().split("T")[0]

    return this.http.get<Dashboard>(
      `${this.apiUrl}/orders/total-revenue/count?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
      { headers },
    )
  }

  getComparisonMonth(monthOne: Date, monthTwo: Date): Observable<MonthComparisonResponse> {
    const headers = this.headerService.getAuthHeaders()
    const formattedMonthOne = this.formatFirstDayOfMonth(monthOne)
    const formattedMonthTwo = this.formatFirstDayOfMonth(monthTwo)

    return this.http.get<MonthComparisonResponse>(
      `${this.apiUrl}/orders/comparison?monthOne=${formattedMonthOne}&monthTwo=${formattedMonthTwo}`,
      { headers },
    )
  }

  private formatFirstDayOfMonth(date: Date): string {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    return `${year}-${month.toString().padStart(2, "0")}-01`
  }

  getBestSellerProducts(): Observable<BestWorts[]> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get<BestWorts[]>(`${this.apiUrl}/products/best-sellers`, { headers });
  }

  getWorstSellerProducts(): Observable<BestWorts[]> {
    const headers = this.headerService.getAuthHeaders();
    return this.http.get<BestWorts[]>(`${this.apiUrl}/products/worst-sellers`, { headers });
  }
}
