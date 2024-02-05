import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../Contracts/product';
import { DisableProductDirective } from '../../../CustomDirectives/disable-product.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, DisableProductDirective],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product!: Product;
}
