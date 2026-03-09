import { Component } from '@angular/core';
import { ICategory } from '../../model/ICategory';
import { FormsModule } from '@angular/forms';
import { Courses } from '../courses/courses';

@Component({
  selector: 'app-category-order',
  imports: [FormsModule, Courses],
  templateUrl: './category-order.html',
  styleUrl: './category-order.css',
})
export class CategoryOrder {
  selectedCategoryId: number = 0;
  totalOrderPrice: number = 0;
  discount: number = 10;
  categories: ICategory[];

  constructor() {
    this.categories = [
      { id: 1, name: 'Programming' },
      { id: 2, name: 'Design' },
      { id: 3, name: 'Marketing' },
      { id: 4, name: 'Business' },
    ];
  }
  setTotalOrderPrice(newPrice: number) {
    this.totalOrderPrice = newPrice;
  }
}
