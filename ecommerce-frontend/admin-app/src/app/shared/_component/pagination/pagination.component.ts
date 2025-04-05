import { Component, EventEmitter, Input, Output } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-pagination",
  standalone: true,
  imports: [CommonModule],
  template: `
  <nav aria-label="Page navigation">
    <ul class="inline-flex -space-x-px text-base h-10">
      <li>
        <button
          (click)="onPageChange(currentPage - 1)"
          [disabled]="currentPage === 1"
          class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          [class.opacity-50]="currentPage === 1"
          >
          Previous
        </button>
      </li>
      
      <!-- First page button with ellipsis -->
      <ng-container *ngIf="showFirstPage">
        <li>
          <button
            (click)="onPageChange(1)"
            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
            1
          </button>
        </li>
        <li *ngIf="startPage > 2">
          <span class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
            ...
          </span>
        </li>
      </ng-container>
      
      <!-- Page numbers -->
      <li *ngFor="let page of visiblePages"> 
        <button
          (click)="onPageChange(page)"
          [class.bg-primary-700]="currentPage === page"
          [class.text-white]="currentPage === page"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
          {{ page }}
        </button>
      </li>
      
      <!-- Last page button with ellipsis -->
      <ng-container *ngIf="showLastPage">
        <li *ngIf="endPage < totalPages - 1">
          <span class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
            ...
          </span>
        </li>
        <li>
          <button
            (click)="onPageChange(totalPages)"
            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
            {{ totalPages }}
          </button>
        </li>
      </ng-container>
      
      <li>
        <button
          (click)="onPageChange(currentPage + 1)"
          [disabled]="currentPage === totalPages"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          [class.opacity-50]="currentPage === totalPages"
          >
          Next
        </button>
      </li>
    </ul>
  </nav>
  `,
})
export class PaginationComponent {
  @Input() totalPages = 0
  @Input() currentPage = 1
  @Output() pageChange = new EventEmitter<number>()

  // Number of page buttons to show (excluding first/last page buttons)
  private maxVisiblePages = 3

  get startPage(): number {
    // Calculate start page based on current page and max visible pages
    if (this.totalPages <= this.maxVisiblePages + 2) {
      return 1
    }

    return Math.max(
      2,
      Math.min(this.currentPage - Math.floor(this.maxVisiblePages / 2), this.totalPages - this.maxVisiblePages - 1),
    )
  }

  get endPage(): number {
    if (this.totalPages <= this.maxVisiblePages + 2) {
      return this.totalPages
    }

    return Math.min(this.startPage + this.maxVisiblePages - 1, this.totalPages - 1)
  }

  get visiblePages(): number[] {
    return this.range(this.startPage, this.endPage)
  }

  get showFirstPage(): boolean {
    return this.totalPages > this.maxVisiblePages + 2 && this.startPage > 1
  }

  get showLastPage(): boolean {
    return this.totalPages > this.maxVisiblePages + 2 && this.endPage < this.totalPages
  }

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page)
    }
  }
}

