import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../../autentication/service/produto/produto.service';
import { AlertComponent } from '../../../shared/models/alert/alert.component';
import { CategoryService } from '../../../autentication/service/categ/category.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  productName = ""
  price = 0
  quantity = 0
  description = ""

  showAlert = false
  message = ""
  categAlert = 0

  isOpen = false

  categories: string[] = []
  selectedCategory = "Categories"
  defaultCategoryText = "Categories"

  private produtoService = inject(ProdutoService)
  private categoryService = inject(CategoryService)

  ngOnInit() {
    this.loadCategories()
    this.selectedCategory = this.defaultCategoryText
    document.addEventListener("click", this.closeDropdownOnClickOutside.bind(this))
  }

  ngOnDestroy() {
    // Remover o listener quando o componente for destruído
    document.removeEventListener("click", this.closeDropdownOnClickOutside.bind(this))
  }

  closeDropdownOnClickOutside(event: MouseEvent) {
    const dropdownElement = document.getElementById("categoryDropdown")
    const buttonElement = document.getElementById("dropdownDefaultButton")

    if (
      this.isOpen &&
      dropdownElement &&
      buttonElement &&
      !dropdownElement.contains(event.target as Node) &&
      !buttonElement.contains(event.target as Node)
    ) {
      this.isOpen = false
    }
  }

  onSubmit() {
    const product = {
      productName: this.productName,
      price: this.price,
      quantity: this.quantity,
      description: this.description,
      category: this.isCategorySelected() ? this.selectedCategory : null,
    }

    this.produtoService.addProduct(product).subscribe({
      next: () => {
        this.showAlert = true
        this.message = "Registro concluído com sucesso!"
        this.categAlert = 3
      },
      error: (error) => {
        console.error("Error:", error)
        this.showAlert = true
        this.message = "Falha no registro."
        this.categAlert = 2
      },
    }) 
  }

  toggleDropdown(event: Event) {
    // Impedir que o evento de clique se propague para o document
    event.stopPropagation()
    this.isOpen = !this.isOpen
    console.log("Dropdown toggled ", this.isOpen)
  }

  selectCategory(category: string | null) {
    if (category === null) {
      this.selectedCategory = this.defaultCategoryText
      console.log("No category selected")
    } else {
      this.selectedCategory = category
      console.log("Selected category:", category)
    }
    this.isOpen = false
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: string[]) => {
        this.categories = data
        console.log("Categories loaded:", this.categories)
      },
      error: (error) => {
        console.error("Error loading categories:", error)
        this.alertError("Erro ao carregar categorias. Por favor, tente novamente.")
      },
    })
  }

  isCategorySelected(): boolean {
    return this.selectedCategory !== this.defaultCategoryText
  }

  clearCategorySelection() {
    this.selectCategory(null)
  }

  alertError(message: string) {
    this.showAlert = true
    this.message = message
    this.categAlert = 2
  }

  alertSuccess(message: string) {
    this.showAlert = true
    this.message = message
    this.categAlert = 3
  }

  alertWarning(message: string) {
    this.showAlert = true
    this.message = message
    this.categAlert = 4
  }
}
