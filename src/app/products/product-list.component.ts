import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from './product.service';
import { ProductCardComponent } from './product-card.component';
import { AuthDirective } from '../shared/authDirective';
import { LogDirective } from '../shared/logDirective';
import { TemperaturePipe } from '../shared/temperature.pipe';
import { SortPipe } from '../shared/sort.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent,AuthDirective,LogDirective,TemperaturePipe,SortPipe],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  editing = false;
  editProduct: Product | any = {};
  newProduct: Partial<Product> = {};
  isLoggedIn = true; // Replace with real auth logic

   historicTemperatures = [
    25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5,
  ];

  onReset(index: number) {
    this.historicTemperatures[index] = 18;
  }

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
