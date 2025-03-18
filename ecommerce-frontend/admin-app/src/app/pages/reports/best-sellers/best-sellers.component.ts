import { Component, OnInit } from '@angular/core';
import { BestWorts } from '../../../autentication/interface/best-worts';
import { DashboardService } from '../../../autentication/service/data/dashboard.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-best-sellers',
  imports: [],
  templateUrl: './best-sellers.component.html'
})
export class BestSellersComponent implements OnInit {
  bestSeller: BestWorts[] = []

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.listBestSellers()
  }

  listBestSellers() {
    this.dashboardService.getBestSellerProducts().subscribe((bestSeller) => {
      this.bestSeller = bestSeller
    })
  } 
}
 