import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [], 
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
      @for (page of pages; track page) {
        <li> 
          <button
            (click)="onPageChange(page)"
            [class.bg-primary-700]="currentPage === page"
            [class.text-white]="currentPage === page"
            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
            {{ page }}
          </button>
        </li>
      }
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
  `
})
export class PaginationComponent {
  @Input() totalPages = 0; // Inicializado com 0
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();
 
  get pages(): number[] {
    const pageCount = Math.min(5, this.totalPages)
    const halfWay = Math.ceil(pageCount / 2)
    const isNearBeginning = this.currentPage <= halfWay
    const isNearEnd = this.currentPage > this.totalPages - halfWay

    if (isNearBeginning) {
      return this.range(1, pageCount)
    } else if (isNearEnd) {
      return this.range(this.totalPages - pageCount + 1, this.totalPages)
    } else {
      return this.range(this.currentPage - halfWay + 1, this.currentPage + halfWay - 1)
    }
  }

  range(start: number, end: number): number[] {
    return [...Array(end - start + 1)].map((_, i) => start + i)
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page)
    }
  }
}
