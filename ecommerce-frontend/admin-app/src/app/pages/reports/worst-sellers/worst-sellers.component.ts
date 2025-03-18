import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../autentication/service/data/dashboard.service';
import { BestWorts } from '../../../autentication/interface/best-worts';

@Component({
  selector: 'app-worts-sellers',
  imports: [],
  templateUrl: './worst-sellers.component.html'
})
export class WorstSellersComponent implements OnInit {
  worstSeller: BestWorts[] = []

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.listBestSellers()
  }

  listBestSellers() {
    this.dashboardService.getWorstSellerProducts().subscribe((worstSeller) => {
      this.worstSeller = worstSeller
    })
  }
}
