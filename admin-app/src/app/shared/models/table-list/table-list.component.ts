import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-list',
  imports: [],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.css'
})
export class TableListComponent {
  @Output() addProduct = new EventEmitter<void>();
  @Output() deleteProduct = new EventEmitter<void>();
  @Input() actionDelete: string = '';
  @Input() actionEdit: string = '';

  isDeleteModalOpen = false;

  showDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeModal() {
    this.isDeleteModalOpen = false;
  }

  onAddProduct() {
    this.addProduct.emit();
  }

  onDeleteProduct() {
    this.deleteProduct.emit();
    this.closeModal();
  }
}
