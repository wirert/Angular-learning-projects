import { Component, Input } from '@angular/core';
import { Product } from '../../Contracts/product';
import { ProductListComponent } from '../product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { SetBackgraoud } from '../../CustomDirectives/SetBackground.directive';
import { AppHoverDirective } from '../../CustomDirectives/app-hover.directive';

@Component({
  selector: 'product-detail',
  standalone: true,
  imports: [CommonModule, SetBackgraoud, AppHoverDirective],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  @Input() productListComp: ProductListComponent | undefined = undefined;

  product: Product | undefined;

  ngOnInit() {
    this.product = this.productListComp!.selectedProduct;
  }

  hideDetails() {
    this.productListComp!.selectedProduct = undefined;
  }
}
