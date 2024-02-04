import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchText: string = '';

  @Output()
  searchTextChange = new EventEmitter<string>();

  //@ViewChild()

  updateSearchText(searchText: string) {
    this.searchText = searchText;
    this.searchTextChange.emit(searchText);
  }
}
