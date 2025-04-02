import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../autentication/service/cart/cart.service';
import { AlertComponent } from '../../../shared/models/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Cart } from '../../../autentication/interface/cart/cart-product';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, AlertComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
}) 
export class CartComponent implements OnInit {
  cartItems: Cart[] = []
  cartTotal = 0
  errorMessage: string | null = null
  isLoading = false

  showAlert: boolean = false;
  categAlert: number = 0;
  message: string = "";

  private cartService = inject(CartService)
  private router = inject(Router)

  ngOnInit(): void {
    this.loadCartItems()
  }

  loadCartItems(): void {
    this.isLoading = true
    this.errorMessage = null

    this.cartService.listItemsInCart().subscribe({
      next: (items) => {
        this.cartItems = items
        this.calculateCartTotal()
        this.isLoading = false
      },
      error: (err) => {
        console.error("Error loading cart items:", err)
        this.errorMessage = "Failed to load cart items. Please try again."
        this.isLoading = false
      },
    })
  }

  calculateCartTotal(): void {
    this.cartTotal = this.cartItems.reduce((total, item) => total + item.totalPrice, 0)
  }

  increaseQuantity(itemId: number): void {
    console.log("Tentando aumentar a quantidade do item:", itemId);
    const item = this.cartItems.find((i) => i.id === itemId);
    console.log("Item encontrado:", item);
    if (item) {
      if (item.quantity < item.product.quantity) {
        console.log(`Quantidade atual: ${item.quantity}, incrementando...`);
        this.updateItemQuantity(itemId, item.quantity + 1);
      } else {
        console.log("Quantidade máxima atingida");
        this.errorMessage = "Maximum available quantity reached";
      }
    }
  }

  decreaseQuantity(itemId: number): void {
    const item = this.cartItems.find((i) => i.id === itemId)
    if (item && item.quantity > 1) {
      this.updateItemQuantity(itemId, item.quantity - 1)
    }
  }

  updateItemQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.errorMessage = "Invalid quantity.";
      return;
    }

    this.cartService.updateCartItemQuantity(productId, quantity).subscribe({
      next: () => {
        console.log("Item quantity updated successfully");
        this.loadCartItems();
      },
      error: (err) => {
        const item = this.cartItems.find((i) => i.id === productId);

        if (item && quantity > item.product.quantity) {
          console.log("Quantidade máxima disponível atingida.");
          this.errorMessage = "Quantidade máxima disponível atingida.";
          this.showAlert = true; 
          this.categAlert = 4;
          this.message = "Erro ao realizar a compra!";
        } else {
          this.errorMessage = "Erro ao adicionar produto.";
          this.showAlert = true;
          this.categAlert = 2;
          this.message = "Erro ao adicionar produto.";
        }
      },
    });
  }

  removeItem(itemId: number): void {
    this.isLoading = true
    this.errorMessage = null
    console.log("Removing item from cart:", itemId)

    this.cartService.removeItemFromCart(itemId).subscribe({
      next: () => {
        console.log("Item removed successfully")
        this.loadCartItems()
      },
      error: (err) => {
        console.error("Error removing item from cart:", err)
        this.errorMessage = "Failed to remove item. Please try again."
        this.isLoading = false
      },
    })
  }

  buyItems(): void {
    if (this.cartItems.length === 0) {
      this.errorMessage = "Your cart is empty"
      return
    }

    this.isLoading = true
    this.errorMessage = null

    this.cartService.buyItemsInCart().subscribe({
      next: (response) => {
        console.log("Purchase successful:", response)
        this.loadCartItems()
        this.errorMessage = "Purchase successful!"
        this.showAlert = true;
        this.categAlert = 3;
        this.message = "Compra realizada com sucesso";
      },
      error: (err) => {
        console.error("Error purchasing items:", err.message)
        this.errorMessage = err.message
        this.isLoading = false;
        this.showAlert = true;
        this.categAlert = 2;
        this.message = err.message;
        setTimeout(() => {
          if (err.message === "Dados do endereço incompletos.") {
            this.router.navigate(['/account'], { queryParams: { edit: true } });
          }
        }, 2000);
        
      },
    })
  }
}