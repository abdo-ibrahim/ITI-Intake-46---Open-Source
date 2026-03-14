import {
  Component,
  ChangeDetectorRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Output,
} from '@angular/core';
import { ICourse } from '../../model/ICourse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { AppDisableAfterClick } from '../../directives/app-disable-after-click';
import { CoursesService } from '../../services/courses.service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule, DiscountPipe, AppDisableAfterClick, RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit, OnChanges, OnDestroy {
  courseService = inject(CoursesService);
  private cdr = inject(ChangeDetectorRef);

  @Input() selectedCategoryId: number = 0;
  @Input() discount: number = 0;
  @Output() totalPriceChange = new EventEmitter<number>();

  courses: ICourse[] = [];
  filteredCourses: ICourse[] = [];
  orderPrice: number = 0;
  hasLoadedCourses: boolean = false;
  private subs: Subscription[] = [];

  ngOnInit() {
    this.fetchCourses();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCategoryId']) {
      this.fetchCourses();
    }
  }

  fetchCourses() {
    this.hasLoadedCourses = false;
    const sub = this.courseService.getCoursesByCategoryID(this.selectedCategoryId).subscribe({
      next: (data) => {
        this.filteredCourses = data;
        this.hasLoadedCourses = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.filteredCourses = [];
        this.hasLoadedCourses = true;
        this.cdr.detectChanges();
      },
    });
    this.subs.push(sub);
  }

  register(course: ICourse) {
    if (course.seats > 0) {
      course.seats--;
    }
    const discPrice = course.price - (course.price * this.discount) / 100;
    this.orderPrice += discPrice;
    this.totalPriceChange.emit(this.orderPrice);
  }

  deleteCourse(id: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      const sub = this.courseService.deleteCourse(id).subscribe({
        next: () => {
          alert('Course deleted successfully!');
          this.filteredCourses = this.filteredCourses.filter((c) => c.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          alert('Error deleting course');
        },
      });
      this.subs.push(sub);
    }
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
