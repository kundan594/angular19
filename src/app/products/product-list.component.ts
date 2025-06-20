import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from './product.service';
import { ProductCardComponent } from './product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  editing = false;
  editProduct: Product | any = {};
  newProduct: Partial<Product> = {};

  @ViewChild(ProductCardComponent) productCard!: ProductCardComponent;

  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.productService.fetchProducts();
  }

  edit(product: Product) {
    this.editing = true;
    this.editProduct = { ...product };
  }

  save() {
    this.productService.updateProduct(this.editProduct);
    this.editing = false;
    this.editProduct = {};
  }

  cancel() {
    this.editing = false;
    this.editProduct = {};
  }

  delete(id: number) {
    this.productService.deleteProduct(id);
  }

  add() {
    if (this.newProduct.title && this.newProduct.brand && this.newProduct.price) {
      this.productService.addProduct(this.newProduct as Omit<Product, 'id'>);
      this.newProduct = {};
    }
  }

  focusFirstProductInput() {
    this.productCard?.focusAllInputs();
  }
}
