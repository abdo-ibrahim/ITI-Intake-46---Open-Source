import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { CategoriesService } from '../../services/categories.service';
import { ICourse } from '../../model/ICourse';
import { ICategory } from '../../model/ICategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-insert-course',
  imports: [CommonModule, FormsModule],
  templateUrl: './insert-course.html',
  styleUrl: './insert-course.css',
})
export class InsertCourse implements OnInit, OnDestroy {
  private cdr: ChangeDetectorRef;
  course: ICourse = {
    id: '',
    title: '',
    instructor: '',
    price: 0,
    seats: 0,
    image: '',
    catId: 0,
    category: '',
  };
  categories: ICategory[] = [];
  isEditMode: boolean = false;
  private subs: Subscription[] = [];

  constructor(
    private coursesService: CoursesService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    cdr: ChangeDetectorRef,
  ) {
    this.cdr = cdr;
  }

  ngOnInit(): void {
    this.subs.push(
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.subs.push(
            this.coursesService.getCourseByID(id).subscribe({
              next: (data) => {
                this.course = data;
                this.cdr.detectChanges();
              },
              error: (err) => console.error(err),
            }),
          );
        }
      }),
    );

    this.subs.push(
      this.categoriesService.getAllCategories().subscribe({
        next: (data) => {
          this.categories = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err),
      }),
    );
  }

  saveCourse(): void {
    const selectedCat = this.categories.find((c) => c.id == this.course.catId);
    if (selectedCat) {
      this.course.category = selectedCat.name;
    }

    if (this.isEditMode) {
      this.subs.push(
        this.coursesService.updateCourse(this.course.id, this.course).subscribe({
          next: () => {
            alert('Course updated successfully!');
            this.router.navigate(['/courses']);
          },
          error: (err) => alert('Error updating course'),
        }),
      );
    } else {
      this.subs.push(
        this.coursesService.addCourse(this.course).subscribe({
          next: () => {
            alert('Course added successfully!');
            this.router.navigate(['/courses']);
          },
          error: (err) => alert('Error adding course'),
        }),
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
