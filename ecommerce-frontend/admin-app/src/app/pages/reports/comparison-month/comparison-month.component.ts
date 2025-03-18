import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../../../autentication/interface/dashboard';
import { DashboardService } from '../../../autentication/service/data/dashboard.service';
import { CurrencyPipe, NgClass, NumberSymbol } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonthComparisonResponse, MonthData } from '../../../autentication/interface/month-data';

@Component({
  selector: 'app-comparison-month',
  imports: [CurrencyPipe, FormsModule, NgClass],
  templateUrl: './comparison-month.component.html',
  styleUrl: './comparison-month.component.css'
})
export class ComparisonMonthComponent implements OnInit {
  monthOneYear: number = new Date().getFullYear()
  monthOneMonth: number = new Date().getMonth() + 1

  monthTwoYear: number = new Date().getFullYear()
  monthTwoMonth: number = new Date().getMonth()

  comparisonData: MonthComparisonResponse | null = null
  loading = false
  error: string | null = null

  // For displaying month names and selection
  monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Generate years for dropdown (current year and 5 years back)
  years: number[] = []

  constructor(private dashboardService: DashboardService) {
    // Initialize years array for dropdown
    const currentYear = new Date().getFullYear()
    for (let i = 0; i < 6; i++) {
      this.years.push(currentYear - i)
    }

    // Handle case where current month is January
    if (this.monthTwoMonth === 0) {
      this.monthTwoMonth = 12
      this.monthTwoYear--
    }
  }

  ngOnInit(): void {
    // Load initial data
    this.fetchComparisonData()
  }

  fetchComparisonData(): void {
    this.loading = true
    this.error = null

    // Create date objects for the first day of each selected month
    const monthOneDate = new Date(this.monthOneYear, this.monthOneMonth - 1, 1)
    const monthTwoDate = new Date(this.monthTwoYear, this.monthTwoMonth - 1, 1)

    this.dashboardService.getComparisonMonth(monthOneDate, monthTwoDate).subscribe({
      next: (response) => {
        this.comparisonData = response
        this.loading = false
      },
      error: (error) => {
        console.error("Error fetching comparison data", error)
        this.error = "Failed to load comparison data. Please try again."
        this.loading = false
      },
    })
  }

  getMonthName(monthData: MonthData): string {
    return `${this.monthNames[monthData.month - 1]} ${monthData.year}`
  }

  calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / previous) * 100
  }

  getChangeClass(change: number): string {
    return change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
  }

  getChangeIcon(change: number): string {
    return change >= 0 ? "↑" : "↓"
  }
}