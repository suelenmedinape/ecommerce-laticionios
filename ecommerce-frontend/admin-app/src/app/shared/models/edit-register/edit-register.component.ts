import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-register',
  imports: [FormsModule],
  templateUrl: './edit-register.component.html',
  styleUrl: './edit-register.component.css'
})
export class EditRegisterComponent {
  // Inputs para receber dados dos pais
  @Input() productName: string = '';
  @Input() price: number = 0;
  @Input() quantity: number = 0;
  @Input() description: string = '';
  @Input() selectedCategory: string = ''; // Valor padrão
  @Input() categories: string[] = [];

  // Outputs para emitir mudanças
  @Output() productNameChange = new EventEmitter<string>();
  @Output() priceChange = new EventEmitter<number>();
  @Output() quantityChange = new EventEmitter<number>();
  @Output() descriptionChange = new EventEmitter<string>();
  @Output() selectedCategoryChange = new EventEmitter<string>();

  // Estado do dropdown (gerido internamente)
  isOpen = false;
  defaultCategoryText = 'Categories';

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  selectCategory(category: string | null) {
    const newCategory = category === null ? '' : category;
    this.selectedCategory = category === null ? this.defaultCategoryText : category;
    this.selectedCategoryChange.emit(newCategory);
    this.isOpen = false;
  }

  isCategorySelected(): boolean {
    return this.selectedCategory !== this.defaultCategoryText;
  }

  clearCategorySelection() {
    this.selectCategory(null)
  }
}