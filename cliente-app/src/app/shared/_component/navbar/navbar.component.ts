import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../autentication/service/auth/user.service';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../../models/alert/alert.component';
import { CardProductComponent } from '../../models/product/card-product.component';
import { ProdutoService } from '../../../autentication/service/products/produto.service';
import { CategoryService } from '../../../autentication/service/categ/category.service';
import { ShopByCategoryComponent } from '../../../pages/byCategory/shop-by-category.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink, AlertComponent, CardProductComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isOpen = false
  showAlert = false
  userRole: string | null = null
  private subscription: Subscription | null = null

  category: string[] = []
  searchTerm = ""
  produtos: any[] = []
  isSearching = false

  private userService = inject(UserService)
  private produtoService = inject(ProdutoService)
  private categoryService = inject(CategoryService)
  private router = inject(Router)

  ngOnInit(): void {
    this.typeNavbarWithBaseInRole()
    this.listCategories()
  }

  listCategories(): void {
    this.categoryService.listCategories().subscribe(
      (data) => {
        console.log("Categorias carregadas:", data)
        this.category = data
      },
      (error) => {
        console.error("Erro ao carregar categorias:", error)
      },
    )
  }

  categSelected(categ: string): void {
    this.router.navigate(["/by-category/", categ])
  }

  toggleDarkMode(): void {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  private typeNavbarWithBaseInRole(): void {
    this.subscription = this.userService.userRole$.subscribe((role: string | null) => {
      console.log('User role updated in NavbarComponent:', role);
      this.userRole = role;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.userService.logout()
  }

  buscarProdutos(): void {
    if (this.searchTerm.trim() === '') { // Verifica se o termo de busca está vazio
      return;
    }
  
    this.getByNameProduct();
  }
  
  getByNameProduct(): void { 
    this.produtoService.getProdutoByName(this.searchTerm).subscribe(
      (produtos) => {
        this.produtos = produtos;
        this.showAlert = produtos.length === 0; // Exibe alerta se nenhum produto for encontrado
        if (this.showAlert) {
          setTimeout(() => {
            this.showAlert = false;
          }, 3000);
        }
      },
      // Exibe erro no console
      (error) => {
        console.error('Erro ao buscar produtos:', error);
      }
    );
  }
}
