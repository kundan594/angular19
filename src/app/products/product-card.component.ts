import { Component, Input } from '@angular/core';
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
}
