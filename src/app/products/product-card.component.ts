import { Component, Input, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit, OnInit } from '@angular/core';
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
        <!-- Always present input (static: true) -->
        <input #productInput type="text" [value]="product.title" />
        <!-- Conditionally present input (static: false) -->
        <input *ngIf="showBrandInput" #productInput2 type="text" [value]="product.brand" />
        <ng-content></ng-content>
        <div class="actions">
          <ng-content select="[card-actions]"></ng-content>
        </div>
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
export class ProductCardComponent implements OnInit, AfterViewInit {
  @Input() product!: Product;
  showBrandInput = true; // Toggle this to test *ngIf scenario

  // Always present input (not inside *ngIf)
  @ViewChild('productInput', { static: true }) productInputRef!: ElementRef<HTMLInputElement>;
  // Conditionally present input (inside *ngIf)
  @ViewChild('productInput2', { static: false }) productInputRef2!: ElementRef<HTMLInputElement>;
  // All input refs
  @ViewChildren('productInput, productInput2') allInputs!: QueryList<ElementRef<HTMLInputElement>>;

  ngOnInit() {
    // This works for static: true
    this.productInputRef.nativeElement.style.border = '2px solid blue';
  }

  ngAfterViewInit() {
    // This works for static: false
    if (this.productInputRef2) {
      this.productInputRef2.nativeElement.style.border = '2px solid green';
      
    }
  }

  focusInput() {
    this.productInputRef?.nativeElement.focus();
  }

  focusInput2() {
    this.productInputRef2?.nativeElement.focus();
  }

  focusAllInputs() {
    this.allInputs.forEach((inputRef) => {
      inputRef.nativeElement.style.border = '2px solid red';
    });
  }
}