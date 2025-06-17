import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav *ngIf="totalPages > 1">
      <ul class="pagination">
        <li class="page-item" [class.disabled]="currentPage === 1">
          <button class="page-link" (click)="selectPage(currentPage - 1)" [disabled]="currentPage === 1">&laquo;</button>
        </li>
        <li class="page-item" *ngFor="let page of pages" [class.active]="page === currentPage">
          <button class="page-link" (click)="selectPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" [class.disabled]="currentPage === totalPages">
          <button class="page-link" (click)="selectPage(currentPage + 1)" [disabled]="currentPage === totalPages">&raquo;</button>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .pagination { display: flex; list-style: none; padding: 0; }
    .page-item { margin: 0 2px; }
    .page-item.active .page-link { background: #007bff; color: #fff; }
    .page-link { border: 1px solid #dee2e6; background: #fff; color: #007bff; padding: 0.375rem 0.75rem; cursor: pointer; }
    .page-item.disabled .page-link { color: #6c757d; pointer-events: none; background: #fff; }
  `]
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 2;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  selectPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
