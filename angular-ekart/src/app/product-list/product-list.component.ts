import { Component } from '@angular/core';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  product = {
    name: 'Samsung 13',
    price: 799,
    color: 'Black',
    inStock: 1,
    discount: 12,
    imgPath: '../assets/R.png',
  };

  calcDiscPrice() {
    return this.product.price * ((100 - this.product.discount) / 100);
  }
}
