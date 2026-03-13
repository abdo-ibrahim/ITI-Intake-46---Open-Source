import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ICourse } from '../../model/ICourse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { AppDisableAfterClick } from '../../directives/app-disable-after-click';
import { CoursesService } from '../../services/courses.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [
    CommonModule,
    FormsModule,
    DiscountPipe,
    AppDisableAfterClick,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  courseService = inject(CoursesService);

  @Input() selectedCategoryId: number = 0;
  @Input() discount: number = 0;
  @Output() totalPriceChange = new EventEmitter<number>();

  courses: ICourse[] = [];
  orderPrice: number = 0;

  ngOnInit() {
    this.courses = this.courseService.getAllCourses();
  }

  register(course: ICourse) {
    if (course.seats > 0) {
      course.seats--;
    }
    const discPrice = course.price - (course.price * this.discount) / 100;
    this.orderPrice += discPrice;
    this.totalPriceChange.emit(this.orderPrice);
  }

  get filteredCourses(): ICourse[] {
    if (this.selectedCategoryId === 0) {
      return this.courses;
    } else {
      return this.courses.filter((course) => course.catId === +this.selectedCategoryId);
    }
  }
}
