import { Component } from '@angular/core';
import { Course } from './courses.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  selectedCategory: string = 'All';

  categories: string[] = ['All', 'Programming', 'Design', 'Marketing', 'Business'];

  courses: Course[] = [
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

  register(course: Course) {
    if (course.seats > 0) {
      course.seats--;
    }
  }

  get filteredCourses(): Course[] {
    if (this.selectedCategory === 'All') {
      return this.courses;
    }
    return this.courses.filter((course) => course.category === this.selectedCategory);
  }
}
