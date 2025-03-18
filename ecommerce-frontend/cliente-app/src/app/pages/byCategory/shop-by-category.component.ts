import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProdutoService } from '../../autentication/service/products/produto.service';
import { AlertComponent } from '../../shared/models/alert/alert.component';
import { PaginationComponent } from '../../shared/_component/pagination/pagination.component';
import { CardProductComponent } from "../../shared/models/product/card-product.component";

@Component({
  selector: 'app-shop-by-category',
  imports: [AlertComponent, PaginationComponent, RouterLink, CardProductComponent],
  templateUrl: './shop-by-category.component.html'
})
export class ShopByCategoryComponent implements OnInit {
  products: any[] = []
  selectedCategory = ""
  loading = false
  showAlert = false
  categAlert = 0
  message = ""

  itemsPerPage = 16;
  currentPage = 1;

  constructor(
    private categoryService: ProdutoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params["category"]) {
        this.getCategory(params["category"])
      }
    })
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get paginatedProdutos() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
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

