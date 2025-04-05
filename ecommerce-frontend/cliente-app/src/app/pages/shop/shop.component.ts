import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PaginationComponent } from '../../shared/_component/pagination/pagination.component';
import { CardProductComponent } from '../../shared/models/product/card-product.component';
import { ProdutoService } from '../../autentication/service/products/produto.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [PaginationComponent, CardProductComponent],
  templateUrl: './shop.component.html'
}) 
export class ShopComponent implements OnInit {
  produtos: { id: number; productName: string; price: number }[] = [];

  itemsPerPage = 16; // Quantos produtos por página
  currentPage = 1; // Página inicial
  isMenuOpen = false;

  constructor(
    private produtosService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.getProduto();
  } 

  // Total de páginas calculado com base no número de produtos
  get totalPages() {
    return Math.ceil(this.produtos.length / this.itemsPerPage);
  }

  // Filtra os produtos de acordo com a página atual
  get paginatedProdutos() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.produtos.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Atualiza a página atual (chamado pelo componente de paginação)
  onPageChange(page: number): void {
    this.currentPage = page; // Atualiza a página atual
  }

  getProduto(): void {
    this.produtosService.getProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      },
    });
  }
}
