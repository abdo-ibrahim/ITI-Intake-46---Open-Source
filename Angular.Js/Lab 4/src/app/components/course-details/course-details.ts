import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../model/ICourse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails implements OnInit {
  courseService = inject(CoursesService);
  course: ICourse | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.course = this.courseService.getCourseByID(+id);
    }
  }
}
