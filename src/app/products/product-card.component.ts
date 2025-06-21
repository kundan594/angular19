import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-card">
      <img [src]="product.thumbnail" width="80" />
      <div>
        <h3>{{ product.title }}</h3>
        <!-- Example input to demonstrate @ViewChild -->
        <input #productInput type="text" [value]="product.title" />
         <input #productInput2 type="text" [value]="product.brand" />
        <!-- Default content slot -->
        <ng-content></ng-content>
        <!-- Named slot for actions -->
        <div class="actions">
          <ng-content select="[card-actions]"></ng-content>
        </div>
        <!-- Named slot for select dropdown -->
        <div class="select-slot">
          <ng-content select="select"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card { display: flex; align-items: center; border: 1px solid #eee; padding: 8px; margin-bottom: 8px; border-radius: 4px; }
    img { margin-right: 12px; }
    .actions { margin-top: 8px; }
    .select-slot { margin-top: 8px; }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;

  @ViewChild('productInput2')  productInputRef2!: ElementRef<HTMLInputElement>

  // 1. Use @ViewChild to get a reference to the input
  @ViewChild('productInput') productInputRef!: ElementRef<HTMLInputElement>;

  // 2. Expose a method to focus the input
  focusInput() {
    this.productInputRef?.nativeElement.focus();
  }

  focusInput2(){
    this.productInputRef2?.nativeElement.focus();
  }
}
