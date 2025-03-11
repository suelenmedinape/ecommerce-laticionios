import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ProdutoService } from '../../autentication/service/produto/produto.service';
import { Product } from '../../autentication/interface/product';
import { RouterLink } from '@angular/router';
import { AlertComponent } from "../../shared/models/alert/alert.component";
import { CategoryService } from '../../autentication/service/categ/category.service';
import { QuantityStatusComponent } from "../../shared/models/quantity-status/quantity-status.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink, NgClass, AlertComponent, QuantityStatusComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  produto: Product[] = []
  idProduct = 0
  selectedProductId: number | null = null
  selectedProducts: number[] = []
  allSelected = false
  isDeleteModalOpen = false
  isInfoModalOpen = false
  isOpen = false
  categories: string[] = []
  selectedCategory = "Categories"
  defaultCategoryText = "Categories"
  search = ""

  showAlert = false
  message = ""
  categAlert = 0

  constructor(
    private produtoService: ProdutoService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.listProducts()
    this.loadCategories()
    this.selectedCategory = this.defaultCategoryText
  }

  listByCategory() {
    if (this.selectedCategory === this.defaultCategoryText) {
      this.listProducts()
      return
    }

    this.categoryService.listByCategory(this.selectedCategory).subscribe({
      next: (data: any) => {
        this.produto = data
        this.selectedProducts = []
        this.allSelected = false
      },
      error: (error) => {
        console.error("Error listing products by category:", error)
        this.alertError("Erro ao listar produtos por categoria. Por favor, tente novamente.")
      },
    })
  }

  searchProduct(name: string) {
    if (name === "") {
      this.listProducts()
      return
    }
    this.produtoService.getProdutoByName(name).subscribe((data: any) => {
      this.produto = data
      this.selectedProducts = []
      this.allSelected = false
    })
  }

  listProducts() {
    this.produtoService.getProdutos().subscribe((data: any) => {
      this.produto = data
      this.selectedProducts = []
      this.allSelected = false
    })
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

  selectCategory(category: string | null) {
    if (category === null) {
      this.selectedCategory = this.defaultCategoryText
      this.listProducts() // Quando limpar a categoria, mostrar todos os produtos
      console.log("No category selected")
    } else {
      this.selectedCategory = category
      console.log("Selected category:", category)
      this.listByCategory() // Chamar listByCategory quando uma categoria for selecionada
    }
    this.isOpen = false
  }

  toggleSelectAll() {
    this.allSelected = !this.allSelected
    this.selectedProducts = this.allSelected ? this.produto.map((p) => p.id || 0).filter((id) => id !== 0) : []
    this.idProduct = this.selectedProducts.length > 0 ? this.selectedProducts[0] : 0
    console.log("Produtos selecionados:", this.selectedProducts)
  }

  isProductSelected(productId: number): boolean {
    return this.selectedProducts.includes(productId)
  }

  selectProduct(productId: number) {
    const index = this.selectedProducts.indexOf(productId)
    if (index === -1) {
      this.selectedProducts.push(productId)
      this.idProduct = productId
    } else {
      this.selectedProducts.splice(index, 1)
      this.idProduct = this.selectedProducts.length > 0 ? this.selectedProducts[this.selectedProducts.length - 1] : 0
    }
    this.allSelected = this.produto.length > 0 && this.selectedProducts.length === this.produto.length
    console.log("Produtos selecionados:", this.selectedProducts)
  }

  deleteProduct() {
    if (this.selectedProducts.length === 0) {
      this.closeModal()
      return
    }
    if (this.selectedProducts.length === 1) {
      this.produtoService.deleteProduct(this.selectedProducts[0]).subscribe({
        next: () => {
          this.listProducts()
          this.closeModal()
          this.alertSuccess("Produto excluído com sucesso!")
        },
        error: (error) => this.handleDeleteError(error),
      })
    } else {
      this.deleteMultipleProducts()
    }
  }

  private deleteMultipleProducts() {
    let successCount = 0,
      errorCount = 0
    const productsToDelete = [...this.selectedProducts]

    const deleteNext = (index: number) => {
      if (index >= productsToDelete.length) {
        this.listProducts()
        this.closeModal()
        this.showDeletionResult(successCount, errorCount)
        return
      }
      this.produtoService.deleteProduct(productsToDelete[index]).subscribe({
        next: () => {
          successCount++
          deleteNext(index + 1)
        },
        error: () => {
          errorCount++
          deleteNext(index + 1)
        },
      })
    }
    deleteNext(0)
  }

  private showDeletionResult(successCount: number, errorCount: number) {
    if (successCount > 0 && errorCount === 0) {
      this.alertSuccess(`${successCount} produtos excluídos com sucesso!`)
    } else if (successCount > 0 && errorCount > 0) {
      this.alertWarning(
        `${successCount} produtos excluídos com sucesso, mas ${errorCount} produtos não puderam ser excluídos.`,
      )
    } else {
      this.alertError(`Nenhum produto pôde ser excluído. Por favor, tente novamente.`)
    }
  }

  private handleDeleteError(error: any) {
    if (error.status === 500 && error.error && JSON.stringify(error.error).includes("constraint")) {
      this.alertError("Este produto não pode ser excluído pois está associado a uma ou mais vendas.")
    } else {
      const messages: { [key: number]: string } = {
        500: "Erro interno do servidor. Por favor, tente novamente mais tarde.",
        404: "Produto não encontrado. Ele pode já ter sido excluído.",
        403: "Você não tem permissão para excluir este produto.",
      }
      this.alertError(messages[error.status] || "Erro desconhecido. Por favor, tente novamente.")
    }
  }

  showDeleteModal() {
    this.isDeleteModalOpen = true
    this.isInfoModalOpen = false
  }
  showInfoModal() {
    this.isInfoModalOpen = true
    this.isDeleteModalOpen = false
  }
  closeModal() { 
    this.isDeleteModalOpen = false
    this.isInfoModalOpen = false
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen
  }

  alertError(message: string) {
    this.showAlert = true
    this.message = message
    this.categAlert = 2
    this.closeModal()
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

  isCategorySelected(): boolean {
    return this.selectedCategory !== this.defaultCategoryText
  }

  clearCategorySelection() {
    this.selectCategory(null)
  }
}
