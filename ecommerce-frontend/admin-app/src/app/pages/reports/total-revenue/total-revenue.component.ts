import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../autentication/service/data/dashboard.service';
import { Dashboard } from '../../../autentication/interface/dashboard';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-total-revenue',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './total-revenue.component.html',
  styleUrl: './total-revenue.component.css'
})
export class TotalRevenueComponent implements OnInit {
  startDate = ""
  endDate = ""
  dashboard: Dashboard | null = null
  loading = false
  error: string | null = null

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // Set default date range to current month
    const today = new Date()
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)

    this.startDate = this.formatDateForInput(firstDay)
    this.endDate = this.formatDateForInput(today)

    // Load initial data
    this.fetchTotalRevenue()
  }

  fetchTotalRevenue(): void {
    if (!this.startDate || !this.endDate) {
      this.error = "Please select both start and end dates"
      return
    }

    this.loading = true
    this.error = null

    this.dashboardService.getTotalRevenue(new Date(this.startDate), new Date(this.endDate)).subscribe({
      next: (response) => {
        this.dashboard = response
        this.loading = false
      },
      error: (error) => {
        console.error("Error fetching total revenue", error)
        this.error = "Failed to load revenue data. Please try again."
        this.loading = false
      },
    })
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split("T")[0]
  }
}
