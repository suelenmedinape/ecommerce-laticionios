import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../../autentication/service/produto/produto.service';
import { AlertComponent } from '../../../shared/models/alert/alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  productName: string = "";
  price: number = 0;
  quantity: number = 0;
  description: string = "";

  showAlert: boolean = false;
  message: string = "";
  categAlert: number = 0;

  private produtoService = inject(ProdutoService);

  onSubmit() {
    const product = {
      productName: this.productName,
      price: this.price,
      quantity: this.quantity,
      description: this.description
    };
  
    this.produtoService.addProduct(product).subscribe({
      next: () => {
        this.showAlert = true;
        this.message = "Registro concluído com sucesso!";
        this.categAlert = 3;
      },
      error: (error) => {
        console.error('Error:', error);
        this.showAlert = true;
        this.message = "Falha no registro.";
        this.categAlert = 2;
      }
    });
  }
} 
