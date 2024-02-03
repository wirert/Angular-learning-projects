import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [SearchComponent, ProductListComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {
  searchText = '';

  setSearchText(searchText: string) {
    this.searchText = searchText;
  }
}
