import { Injectable } from '@angular/core';
import { ICourse } from '../model/ICourse';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses: ICourse[];
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

  getAllCourses(): ICourse[] {
    return this.courses;
  }
  
  getCourseByID(courseID: number): ICourse | undefined {
    return this.courses.find((course) => course.id === courseID);
  }

  getCoursesByCatID(catID: number): ICourse[] {
    if (catID === 0) {
      return this.courses;
    }
    return this.courses.filter((course) => course.catId === catID);
  }
}
