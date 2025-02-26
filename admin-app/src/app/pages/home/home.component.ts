import { Component, HostListener, OnInit } from '@angular/core';
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
  imports: [PaginationComponent, AlertComponent, CurrencyPipe, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isDropdownOpen = false;
  produtos: { id: number; productName: string; price: number; quantity: number; description: string }[] = [];

  itemsPerPage = 20; // Quantos produtos por página
  currentPage = 1; // Página inicial
  isMenuOpen = false;

  showAlert: boolean = false;
  message: string = "";
  categAlert: number = 0;

  searchTerm: string = '';
  isSearching: boolean = false;
  private searchSubject = new Subject<string>();

  constructor(
    private produtosService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listProducts();

    // Configura busca com debounce
    this.searchSubject.pipe(
      debounceTime(300), // Aguarda 300ms antes de buscar
      distinctUntilChanged() // Evita buscas duplicadas
    ).subscribe(term => {
      if (term.trim() === '') {
        this.listProducts(); // Se estiver vazio, carrega tudo novamente
      } else {
        this.getByNameProduct(term);
      }
    });
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

  toggleDropdown3() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.isDropdownOpen = false;
    }
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
    this.searchSubject.next(this.searchTerm); // Envia o termo para ser processado
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

  deleteProduct(id: number): void {
    this.produtosService.deleteProduct(id).subscribe(
      () => {
        this.listProducts();
        this.showAlert = true;
        this.message = "Produto deletado com sucesso.";
        this.categAlert = 3;

      },
      error => {
        this.showAlert = true;
        this.message = "Erro ao deletar produto.";
        this.categAlert = 2;
      }
    );
  }

}
