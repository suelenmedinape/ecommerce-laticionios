import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../autentication/service/cart/cart.service';
import { AlertComponent } from '../../../shared/models/alert/alert.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [AlertComponent, FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  showAlert: boolean = false;
  categAlert:number = 0;
  message: string = "";

  constructor(private cartService: CartService) { } 

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.cartService.listCart().subscribe({
      next: (items) => {
        this.cartItems = items;
      },
      error: (error) => {
        console.error("Erro ao carregar o carrinho:", error);
      }
    });
  } 

  decrementQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.cartService.updateCartItem({ productId: item.id, quantity: item.quantity }).subscribe({
        next: () => console.log("Item atualizado no backend."),
        error: (error) => console.error("Erro ao atualizar item:", error),
      });
    }
  }

  incrementQuantity(item: any): void {
    item.quantity += 1;
    this.cartService.updateCartItem({ productId: item.id, quantity: item.quantity }).subscribe({
      next: () => console.log("Item atualizado no backend."),
      error: (error) => console.error("Erro ao atualizar item:", error),
    });
  }

  remover(itemId: number): void {
    this.cartService.removeItem(itemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== itemId);
        this.showAlert = true;
        this.categAlert = 3;
        this.message = "Produto removido com sucesso!";
        this.loadCart();
      },
      error: (error) => console.error("Erro ao remover item:", error),
    });
  } 

  loadCart() {
    this.cartService.listCart().subscribe(itemId => {
      this.cartItems = itemId;
    })
  }

  buyCart() {
    this.cartService.buyCart().subscribe({
      next: () => {
        this.cartItems = [];
        this.showAlert = true;
        this.categAlert = 3;
        this.message = "Compra realizada com sucesso!";
      },
      error: (error) => {
        this.showAlert = true;
        this.categAlert = 2;
        this.message = "Erro ao realizar a compra!";
      },
    });
  }
}
