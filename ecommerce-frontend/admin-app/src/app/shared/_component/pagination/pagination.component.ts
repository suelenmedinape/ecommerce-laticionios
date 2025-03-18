import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() totalPages = 10
  @Input() currentPage = 1
  @Output() pageChange = new EventEmitter<number>()

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
