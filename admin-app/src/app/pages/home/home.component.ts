import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from '../../autentication/service/produto/produto.service';
import { PaginationComponent } from "../../shared/_component/pagination/pagination.component";
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AlertComponent } from '../../shared/models/alert/alert.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PaginationComponent, AlertComponent, CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  produtos: { id: number; productName: string; price: number; quantity: number; description: string }[] = [];

  itemsPerPage = 20;
  currentPage = 1; 
  isMenuOpen = false;

  showAlert: boolean = false;
  message: string = "";
  categAlert: number = 0;

  searchTerm: string = '';
  isSearching: boolean = false;
  private searchSubject = new Subject<string>();


  isDeleteModalOpen: boolean = false;
  isInfoModalOpen: boolean = false;
  selectedProductId: number | null = null;
  selectedProductsIds: number[] = [];

  constructor(
    private produtosService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listProducts();

    this.searchSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged() 
    ).subscribe(term => {
      if (term.trim() === '') {
        this.listProducts(); 
      } else {
        this.getByNameProduct(term);
      }
    });
  }

  get totalPages() {
    return Math.ceil(this.produtos.length / this.itemsPerPage);
  }

  get paginatedProdutos() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.produtos.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page; 
  }

  listProducts(): void {
    this.produtosService.getProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      },
    });
  }

  buscarProdutos(): void {
    this.searchSubject.next(this.searchTerm); 
  }

  getByNameProduct(nome: string): void {
    this.isSearching = true;
    this.produtosService.getProdutoByName(nome).subscribe(
      produtos => {
        this.produtos = produtos;
        this.showAlert = produtos.length === 0;
        this.isSearching = false;

        if (this.showAlert) {
          setTimeout(() => this.showAlert = false, 3000);
        }
      },
      error => {
        this.showAlert = true;
        this.message = "Erro ao buscar produtos.";
        this.categAlert = 2;
        this.isSearching = false;
      }
    );
  }

  selectProducts(id: number): void {
    this.selectedProductId = id;
    setTimeout(() => {
      this.selectedProductId = null;
    }, 5000);
    const index = this.selectedProductsIds.indexOf(id);
    if (index === -1) {
      this.selectedProductsIds.push(id); 
    } else {
      this.selectedProductsIds.splice(index, 1); 
    }
  }

  deleteProduct(): void {
    if (this.selectedProductsIds.length > 0) {
      this.selectedProductsIds.forEach(id => {
        this.produtosService.deleteProduct(id).subscribe(
          () => {
            this.listProducts(); 
            this.showAlert = true;
            this.message = `Produto com ID ${id} deletado com sucesso.`;
            this.categAlert = 3;
            console.log('Deletando o produto com id:', id);
          },
          error => {
            this.showAlert = true;
            this.message = "Erro ao deletar produto.";
            this.categAlert = 2;
          }
        );
      });
      this.selectedProductsIds = []; // Limpa a seleção após a exclusão
    } else {
      this.showAlert = true;
      this.message = "Nenhum produto selecionado.";
      this.categAlert = 2;
    }
  }

  showDeleteModal() {
    this.isDeleteModalOpen = true;
    this.isInfoModalOpen = false; 
  }

  showInfoModal() {
    this.isInfoModalOpen = true;
    this.isDeleteModalOpen = false; 
  }

  closeModal() {
    this.isDeleteModalOpen = false;
    this.isInfoModalOpen = false;
  }

}
