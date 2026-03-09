import { Component, signal } from '@angular/core';
import { Courses } from './components/courses/courses';
import { CategoryOrder } from "./components/category-order/category-order";

@Component({
  selector: 'app-root',
  imports: [Courses, CategoryOrder],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('coursesApp');
}
