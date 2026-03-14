import { ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../model/ICourse';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails implements OnInit, OnDestroy {
  courseService = inject(CoursesService);
  private cdr = inject(ChangeDetectorRef);
  course: ICourse | undefined;
  hasLoadedCourse: boolean = false;
  private sub: Subscription | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Course ID from route:', id);
    if (id) {
      this.sub = this.courseService.getCourseByID(id).subscribe({
        next: (data) => {
          this.course = data;
          this.hasLoadedCourse = true;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.course = undefined;
          this.hasLoadedCourse = true;
          this.cdr.detectChanges();
        },
        complete: () => console.log('Course details fetched successfully:', this.course),
      });
    } else {
      this.course = undefined;
      this.hasLoadedCourse = true;
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
