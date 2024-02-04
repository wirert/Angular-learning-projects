import { Component, Input } from '@angular/core';
import { Product } from '../../Contracts/product';
import { ProductListComponent } from '../product-list/product-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  @Input() productListComp: ProductListComponent | undefined = undefined;

  product: Product | undefined;

  ngOnInit() {
    this.product = this.productListComp!.selectedProduct;
  }
}
