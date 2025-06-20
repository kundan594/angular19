import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  // ...add more fields as needed
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  products = signal<Product[]>([]);
  loading = signal<boolean>(false);
  error = signal<any>(null);

  constructor(private http: HttpClient) {
    effect(() => {
      // Log whenever the products list changes
      console.log('Products updated:', this.products());
      // You can also react to loading or error changes if needed
      // console.log('Loading:', this.loading());
      // console.log('Error:', this.error());
    });
  }

  fetchProducts(): void {
    this.loading.set(true);
    this.http.get<ProductResponse>('https://dummyjson.com/products')
      .subscribe({
        next: res => {
          this.products.set(res.products);
          this.loading.set(false);
        },
        error: err => {
          this.error.set(err);
          this.loading.set(false);
        }
      });
  }

  addProduct(product: Omit<Product, 'id'>): void {
    this.loading.set(true);
    this.http.post<Product>('https://dummyjson.com/products/add', product)
      .subscribe({
        next: newProduct => {
          this.products.set([...this.products(), newProduct]);
          this.loading.set(false);
        },
        error: err => {
          this.error.set(err);
          this.loading.set(false);
        }
      });
  }

  updateProduct(product: Product): void {
    this.loading.set(true);
    this.http.put<Product>(`https://dummyjson.com/products/${product.id}`, product)
      .subscribe({
        next: updated => {
          this.products.set(this.products().map(p => p.id === updated.id ? updated : p));
          this.loading.set(false);
        },
        error: err => {
          this.error.set(err);
          this.loading.set(false);
        }
      });
  }

  deleteProduct(id: number): void {
    this.loading.set(true);
    this.http.delete(`https://dummyjson.com/products/${id}`)
      .subscribe({
        next: () => {
          this.products.set(this.products().filter(p => p.id !== id));
          this.loading.set(false);
        },
        error: err => {
          this.error.set(err);
          this.loading.set(false);
        }
      });
  }
}
