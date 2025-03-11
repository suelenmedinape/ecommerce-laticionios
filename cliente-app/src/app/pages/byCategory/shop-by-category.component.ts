import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../autentication/service/categ/category.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardProductComponent } from "../../shared/models/product/card-product.component";
import { NgFor, NgIf } from '@angular/common';
import { ProdutoService } from '../../autentication/service/products/produto.service';
import { AlertComponent } from '../../shared/models/alert/alert.component';
import { PaginationComponent } from '../../shared/_component/pagination/pagination.component';

@Component({
  selector: 'app-shop-by-category',
  imports: [NgIf, AlertComponent, PaginationComponent, RouterLink],
  templateUrl: './shop-by-category.component.html',
  styleUrl: './shop-by-category.component.css'
})
export class ShopByCategoryComponent implements OnInit {
  products: any[] = []
  selectedCategory = ""
  loading = false
  showAlert = false
  categAlert = 0
  message = ""
  itemsPerPage = 16; // Quantos produtos por página
  currentPage = 1; // Página inicial

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // You can optionally check for category parameter in the route here
    this.route.params.subscribe((params) => {
      if (params["category"]) {
        this.getCategory(params["category"])
      }
    })
  }

  onPageChange(page: number): void {
    this.currentPage = page; // Atualiza a página atual
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  getCategory(category: string): void {
    this.loading = true
    this.selectedCategory = category
    this.categoryService.listProductsByCategory(category).subscribe({
      next: (data) => {
        this.products = data
        this.loading = false
      },
      error: (error) => {
        console.error("Erro ao carregar produtos por categoria:", error)
        this.loading = false
        this.showAlert = true
        this.categAlert = 2
        this.message = "Erro ao carregar produtos da categoria."
      },
    })
  }

  trackByProductId(index: number, product: any): number {
    return product.id || index 
  }
}

