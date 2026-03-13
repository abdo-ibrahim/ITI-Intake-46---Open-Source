import { Component, inject } from '@angular/core';
import { ICategory } from '../../model/ICategory';
import { FormsModule } from '@angular/forms';
import { Courses } from '../courses/courses';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-order',
  imports: [FormsModule, Courses],
  templateUrl: './category-order.html',
  styleUrl: './category-order.css',
})
export class CategoryOrder {
  categoryService = inject(CategoriesService);

  categories: ICategory[] = [];

  selectedCategoryId: number = 0;
  totalOrderPrice: number = 0;
  discount: number = 10;

  constructor() {
    this.categories = this.categoryService.getAllCategories();
  }

  setTotalOrderPrice(newPrice: number) {
    this.totalOrderPrice = newPrice;
  }
}
