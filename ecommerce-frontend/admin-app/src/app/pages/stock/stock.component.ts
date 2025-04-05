import { Component, OnInit } from '@angular/core';
import { Product } from '../../autentication/interface/product';
import { DashboardService } from '../../autentication/service/data/dashboard.service';
import { PaginationComponent } from '../../shared/_component/pagination/pagination.component';
import { AlertComponent } from '../../shared/models/alert/alert.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock',
  imports: [PaginationComponent, RouterLink, FormsModule],
  templateUrl: './stock.component.html'
})
export class StockComponent implements OnInit {
  stock: Product[] = [];
  searchStock = 0; 
  itemsPerPage = 16; 
  currentPage = 1; 
  totalPages = 1; 

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.listLowStock();
  }

  searchValueStock(searchStock: number) {
    this.dashboardService.getValueLowStockProducts(searchStock).subscribe({
      next: (response) => {
        this.stock = response;
        this.currentPage = 1; 
        this.totalPages = Math.ceil(this.stock.length / this.itemsPerPage); 
        console.log('Produtos com estoque baixo carregados:', this.stock);
      },
      error: (error) => {
        console.error('Erro ao listar produtos com baixo estoque', error);
      }
    });
  }

  listLowStock() {
    this.dashboardService.getLowStockProducts().subscribe({
      next: (response) => {
        this.stock = response;
        this.totalPages = Math.ceil(this.stock.length / this.itemsPerPage); // Atualiza o total de páginas
        console.log('Produtos com baixo estoque carregados:', this.stock);
      },
      error: (error) => {
        console.error('Erro ao listar produtos com baixo estoque', error);
      }
    });
  }

  get paginatedStock(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.stock.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log('Página alterada para:', this.currentPage);
  }
}