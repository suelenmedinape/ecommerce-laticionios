import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../../shared/models/alert/alert.component';
import { ProdutoService } from '../../../autentication/service/produto/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../autentication/service/categ/category.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent implements OnInit {
  productName: string = "";
  price: number = 0;
  quantity: number = 0;
  description: string = "";
  categories: string = ""; // Add this property to match your Product interface

  showAlert: boolean = false;
  message: string = "";
  categAlert: number = 0;

  isOpen = false;

  category: string[] = []; 
  selectedCategory = "Categories";
  defaultCategoryText = "Categories";

  private produtoService = inject(ProdutoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  productId!: number;
  private categoryService = inject(CategoryService);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      this.loadProduct();
    });
    this.loadCategories();
  }

  loadProduct() {
    this.produtoService.getProductById(this.productId).subscribe(product => {
      this.productName = product.productName;
      this.price = product.price;
      this.quantity = product.quantity;
      this.description = product.description;
      this.categories = product.categories;
      
      // Update the selectedCategory if a category is already set
      if (product.categories && product.categories !== "") {
        this.selectedCategory = product.categories;
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
  
    const product = {
      id: this.productId,
      productName: this.productName,
      price: this.price,
      quantity: this.quantity,
      description: this.description,
      categories: this.categories // Make sure to include the comma here
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

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    console.log("Dropdown toggled ", this.isOpen);
  }

  selectCategory(category: string | null) {
    if (category === null) {
      this.selectedCategory = this.defaultCategoryText;
      this.categories = ""; // Clear the categories property
      console.log("No category selected");
    } else {
      this.selectedCategory = category;
      this.categories = category; // Update the categories property
      console.log("Selected category:", category);
    }
    this.isOpen = false;
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: string[]) => {
        this.category = data;
        console.log("Categories loaded:", this.category);
      },
      error: (error) => {
        console.error("Error loading categories:", error);
        this.alertError("Erro ao carregar categorias. Por favor, tente novamente.");
      },
    });
  }

  isCategorySelected(): boolean {
    return this.selectedCategory !== this.defaultCategoryText;
  }

  clearCategorySelection() {
    this.selectCategory(null);
  }

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