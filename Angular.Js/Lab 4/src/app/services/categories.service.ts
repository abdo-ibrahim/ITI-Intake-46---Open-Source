import { Injectable } from '@angular/core';
import { ICategory } from '../model/ICategory';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories: ICategory[];
  constructor() {
    this.categories = [
      { id: 1, name: 'Programming' },
      { id: 2, name: 'Design' },
      { id: 3, name: 'Marketing' },
      { id: 4, name: 'Business' },
    ];
  }

  getAllCategories(): ICategory[] {
    return this.categories;
  }
}
