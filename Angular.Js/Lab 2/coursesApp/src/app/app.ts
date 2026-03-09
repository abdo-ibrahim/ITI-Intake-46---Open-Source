import { Component, signal } from '@angular/core';
import { Courses } from './courses/courses';

@Component({
  selector: 'app-root',
  imports: [Courses],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('coursesApp');
}
