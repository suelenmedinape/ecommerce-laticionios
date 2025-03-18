import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProdutoService } from '../../autentication/service/products/produto.service';
import { BestSellers } from '../../autentication/interface/products/best-sellers';
import { CardProductComponent } from '../../shared/models/product/card-product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CardProductComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  bestSeller: BestSellers[] = []

  constructor(private productService: ProdutoService) { }

  ngOnInit(): void {
    this.listBestSellers()
  }

  listBestSellers() {
    this.productService.getBestSellerProducts().subscribe({
      next: (bestSeller) => {
        this.bestSeller = bestSeller.slice(0, 4);
        console.log('Data received:', bestSeller);
      },
      error: (error) => {
        console.error('Error fetching best sellers:', error);
      }
    });
  }
}
