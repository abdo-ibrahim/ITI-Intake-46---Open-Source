import { ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ICategory } from '../../model/ICategory';
import { FormsModule } from '@angular/forms';
import { Courses } from '../courses/courses';
import { CategoriesService } from '../../services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-order',
  imports: [FormsModule, Courses],
  templateUrl: './category-order.html',
  styleUrl: './category-order.css',
})
export class CategoryOrder implements OnInit, OnDestroy {
  categoryService = inject(CategoriesService);
  private cdr = inject(ChangeDetectorRef);

  categories: ICategory[] = [];
  selectedCategoryId: number = 0;
  totalOrderPrice: number = 0;
  discount: number = 10;
  private sub: Subscription | null = null;

  ngOnInit() {
    this.sub = this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  setTotalOrderPrice(newPrice: number) {
    this.totalOrderPrice = newPrice;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
