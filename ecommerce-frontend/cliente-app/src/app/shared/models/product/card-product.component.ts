import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { CartService } from '../../../autentication/service/cart/cart.service';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RouterLinkActive, AlertComponent],
  templateUrl: './card-product.component.html'
})
export class CardProductComponent {
  @Input() lista: any[] = []
  errorMessage = ""
  showAlert = false
  categAlert = 0
  message = ""

  constructor(private cartService: CartService) {}

  addToCart(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.errorMessage = "Quantidade inválida."
      return
    }

    this.cartService.addItemToCart(productId, quantity).subscribe({
      next: () => {
        this.showAlert = true
        this.categAlert = 3
        this.message = "Produto adicionado ao carrinho!"
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = "Faça login para adicionar itens ao carrinho."
          this.showAlert = true
          this.categAlert = 4
          this.message = "Erro ao realizar a compra!"
        } else {
          this.errorMessage = "Erro ao adicionar produto."
          this.showAlert = true
          this.categAlert = 2
          this.message = "Erro ao adicionar produto."
        }
      },
    })
  }
}
