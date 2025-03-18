import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../../autentication/service/produto/produto.service';
import { AlertComponent } from '../../../shared/models/alert/alert.component';
import { EditRegisterComponent } from "../../../shared/models/edit-register/edit-register.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, AlertComponent, EditRegisterComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  // Dados do formulário
  productName = '';
  price = 0;
  quantity = 0;
  description = '';
  category = ''; // Agora usamos apenas 'category' para armazenar a categoria selecionada

  // Alertas
  showAlert = false;
  message = '';
  categAlert = 0;

  // Lista de categorias
  categories: string[] = [];

  // Serviço
  private produtoService = inject(ProdutoService);

  ngOnInit() {
    this.loadCategories();
    this.category = 'Categoria'; // Define o valor inicial como 'Categoria'
  }

  // Carrega as categorias do serviço
  loadCategories() {
    this.produtoService.getCategories().subscribe({
      next: (data: string[]) => {
        this.categories = data;
        console.log('Categories loaded:', this.categories);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.alertError('Erro ao carregar categorias. Por favor, tente novamente.');
      },
    });
  }

  // Envia o formulário
  onSubmit() {
    const product = {
      productName: this.productName,
      price: this.price,
      quantity: this.quantity,
      description: this.description,
      category: this.category, // Usamos a categoria selecionada
    };

    this.produtoService.addProduct(product).subscribe({
      next: () => {
        this.alertSuccess('Registro concluído com sucesso!');
      },
      error: (error) => {
        console.error('Error:', error);
        this.alertError('Falha no registro.');
      },
    });
  }

  // Métodos de alerta
  alertError(message: string) {
    this.showAlert = true;
    this.message = message;
    this.categAlert = 2;
  }

  alertSuccess(message: string) {
    this.showAlert = true;
    this.message = message;
    this.categAlert = 3;
  }

  alertWarning(message: string) {
    this.showAlert = true;
    this.message = message;
    this.categAlert = 4;
  }
}
