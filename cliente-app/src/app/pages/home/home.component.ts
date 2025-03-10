import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CardProductComponent } from '../../shared/models/product/card-product.component';
import { ProdutoService } from '../../autentication/service/products/produto.service';
import { CategoriaService } from '../../autentication/service/categoria/categoria.service';
import { map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  produtos: { id: number; productName: string; price: number }[] = []

  categorias$!: Observable<{ id: number; nome: string; desc: string }[]>
  categoriasLimitadas: { id: number; nome: string; desc: string }[] = []

  private produtosService = inject(ProdutoService)
  private categoriaService = inject(CategoriaService)

  ngOnInit() {
    this.getProdutos()
    this.categorias$ = this.categoriaService.getCategorias()
    this.getCategLimit()
  }

  getProdutos(): void {
    this.produtosService.getProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados.slice(0, 4) // Pegando apenas os 4 primeiros produtos
      },
      error: (err) => {
        console.error("Erro ao buscar produtos:", err)
      },
    })
  }

  getStars(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => rating - i)
  }

  getCategLimit(): void {
    this.categoriaService
      .getCategorias()
      .pipe(take(1))
      .subscribe((categorias) => {
        this.categoriasLimitadas = categorias.slice(0, 3)
      })
  }

  getCategoryName(idCateg: number): Observable<string> {
    return this.categorias$.pipe(
      map((categorias) => {
        const categoria = categorias.find((cat) => cat.id === idCateg)
        return categoria ? categoria.nome : "Categoria não encontrada"
      }),
    )
  }
}
