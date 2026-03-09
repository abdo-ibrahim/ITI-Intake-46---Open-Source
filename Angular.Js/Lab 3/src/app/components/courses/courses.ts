import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourse } from '../../model/ICourse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { AppDisableAfterClick } from '../../directives/app-disable-after-click';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule, DiscountPipe, AppDisableAfterClick],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  @Input() selectedCategoryId: number = 0;
  @Input() discount: number = 0;
  @Output() totalPriceChange = new EventEmitter<number>();

  courses: ICourse[];
  orderPrice: number = 0;
  constructor() {
    this.courses = [
      {
        id: 1,
        title: 'Angular Basics',
        instructor: 'Abdelrahman Ibrahim',
        price: 100,
        seats: 5,
        image: 'https://picsum.photos/200/150?random=1',
        catId: 1,
        category: 'Programming',
      },
      {
        id: 2,
        title: 'UI/UX Design',
        instructor: 'Ahmed Mohamed',
        price: 120,
        seats: 0,
        image: 'https://picsum.photos/200/150?random=2',
        catId: 2,
        category: 'Design',
      },
      {
        id: 3,
        title: 'Marketing 101',
        instructor: 'Mohamed Ali',
        price: 90,
        seats: 10,
        image: 'https://picsum.photos/200/150?random=3',
        catId: 3,
        category: 'Marketing',
      },
      {
        id: 4,
        title: 'Business Strategy',
        instructor: 'Ali Hassan',
        price: 150,
        seats: 2,
        image: 'https://picsum.photos/200/150?random=4',
        catId: 4,
        category: 'Business',
      },
      {
        id: 5,
        title: 'Advanced Angular',
        instructor: 'Eslam Ali',
        price: 200,
        seats: 4,
        image: 'https://picsum.photos/200/150?random=5',
        catId: 1,
        category: 'Programming',
      },
    ];
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
