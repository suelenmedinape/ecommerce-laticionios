import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../shared/models/alert/alert.component';
import { ProdutoService } from '../../../autentication/service/produto/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditRegisterComponent } from "../../../shared/models/edit-register/edit-register.component";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, AlertComponent, EditRegisterComponent],
  templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit {
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
  categoryList: string[] = [];

  // ID do produto
  productId!: number;

  // Serviços
  private produtoService = inject(ProdutoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      this.loadProduct();
    });
    this.loadCategories();
  }

  // Carrega o produto pelo ID
  loadProduct() {
    this.produtoService.getProductById(this.productId).subscribe((product) => {
      console.log('Produto retornado pela API:', product); // Debug
  
      this.productName = product.productName;
      this.price = product.price;
      this.quantity = product.quantity;
      this.description = product.description;
  
      // Acesse a propriedade correta: categories
      this.category = product.categories || ''; // Use categories em vez de category
      console.log('Categoria carregada:', this.category); // Debug
    });
  }

  loadCategories() {
    this.produtoService.getCategories().subscribe({
      next: (data: string[]) => {
        this.categoryList = data;
        console.log('Categories loaded:', this.categoryList);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.alertError('Erro ao carregar categorias. Por favor, tente novamente.');
      },
    });
  }

  // Envia o formulário
  onSubmit(event: Event) {
    event.preventDefault();

    const product = {
      id: this.productId,
      productName: this.productName,
      price: this.price,
      quantity: this.quantity,
      description: this.description,
      category: this.category, // Usamos a categoria selecionada
    };

    this.produtoService.editProduct(product).subscribe({
      next: () => {
        this.alertSuccess('Edição concluída com sucesso!');
      },
      error: (error) => {
        console.error('Error:', error);
        this.alertError('Falha na edição.');
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