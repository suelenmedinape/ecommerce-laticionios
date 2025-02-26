import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../shared/models/alert/alert.component';
import { ProdutoService } from '../../../autentication/service/produto/produto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent implements OnInit{
  productName: string = "";
  price: number = 0;
  quantity: number = 0;
  description: string = "";

  showAlert: boolean = false;
  message: string = "";
  categAlert: number = 0;

  private produtoService = inject(ProdutoService);
  private route = inject(ActivatedRoute);
  private router =  inject(Router);
  productId!: number;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      this.loadProduct();
    });
  }

  loadProduct() {
    this.produtoService.getProductById(this.productId).subscribe(product => {
      this.productName = product.productName;
      this.price = product.price;
      this.quantity = product.quantity;
      this.description = product.description;
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
  
    const product = {
      id: this.productId,
      productName: this.productName,
      price: this.price,
      quantity: this.quantity,
      description: this.description
    };
  
    this.produtoService.editProduct(product).subscribe({
      next: () => {
        this.showAlert = true;
        this.message = "Edição concluída com sucesso!";
        this.categAlert = 3;
      },
      error: (error) => {
        console.error('Error:', error);
        this.showAlert = true;
        this.message = "Falha na edição.";
        this.categAlert = 2;
      }
    });
  }

  /*selectProducts(id: number): void {
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
  } */
}
